import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Calendar, Mail, Phone, Building, MessageSquare, IndianRupee, Download } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Admin() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`${API}/contact`);
                // Sort by timestamp descending (newest first)
                const sorted = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setSubmissions(sorted);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch submissions:", err);
                setError("Unable to load contact submissions. Ensure the backend is running.");
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    const formatDate = (isoString) => {
        if (!isoString) return 'Unknown Date';
        return new Date(isoString).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const exportToCSV = () => {
        if (submissions.length === 0) return;

        // Define CSV headers
        const headers = ['Date', 'Name', 'Company', 'Email', 'Phone', 'Budget', 'Description'];

        // Convert data to CSV rows
        const rows = submissions.map(sub => [
            new Date(sub.timestamp).toLocaleString(),
            `"${sub.name || ''}"`,
            `"${sub.company || ''}"`,
            `"${sub.email || ''}"`,
            `"${sub.phone || ''}"`,
            `"${sub.budget || ''}"`,
            `"${(sub.description || '').replace(/"/g, '""')}"` // Escape quotes in description
        ]);

        // Combine headers and rows
        const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

        // Create a Blob and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `vivam_leads_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-10 px-6">
            <div className="container-main max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-outfit tracking-tight">Admin Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Project inquiries & contact submissions</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold text-sm">
                            Total Inquiries: {submissions.length}
                        </div>
                        <button
                            onClick={exportToCSV}
                            disabled={submissions.length === 0 || loading}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-600 text-white px-5 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 glass-card rounded-2xl">
                        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground font-medium">Loading submissions...</p>
                    </div>
                ) : error ? (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive p-6 rounded-2xl text-center">
                        {error}
                    </div>
                ) : submissions.length === 0 ? (
                    <div className="glass-card rounded-2xl p-12 text-center text-muted-foreground">
                        No inquiries received yet. They will appear here once submitted.
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {submissions.map((sub, index) => (
                            <motion.div
                                key={sub.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8"
                            >

                                {/* Left Column: Contact Details */}
                                <div className="flex-1 space-y-5">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-xl font-bold text-foreground font-outfit">{sub.name}</h2>
                                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(sub.timestamp)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <a href={`mailto:${sub.email}`} className="text-foreground hover:text-primary transition-colors cursor-pointer truncate">
                                                {sub.email}
                                            </a>
                                        </div>
                                        {sub.phone && (
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500">
                                                    <Phone className="w-4 h-4" />
                                                </div>
                                                <span className="text-foreground">{sub.phone}</span>
                                            </div>
                                        )}
                                        {sub.company && (
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                    <Building className="w-4 h-4" />
                                                </div>
                                                <span className="text-foreground truncate">{sub.company}</span>
                                            </div>
                                        )}
                                        {sub.budget && (
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                                                    <IndianRupee className="w-4 h-4" />
                                                </div>
                                                <span className="text-foreground">{sub.budget.replace('k', ',000').replace('+', ' and above')}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column: Project Description */}
                                <div className="md:w-[45%] bg-muted/30 rounded-xl p-5 border border-white/5">
                                    <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground">
                                        <MessageSquare className="w-4 h-4 text-primary" />
                                        Project Details
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        {sub.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
