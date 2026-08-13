/**
 * Centralized Master File Download Utility
 * 
 * Master Architecture Fix for Application File Downloads:
 * 1. Parses RFC 2616 (filename="...") and RFC 5987 (filename*=UTF-8''...) Content-Disposition headers.
 * 2. Provides centralized MIME type resolution for PDF, XLSX, CSV, DOCX, PNG, JPG, ZIP, etc.
 * 3. Sanitizes filenames (removing path traversal & illegal OS characters: / \ : * ? " < > |).
 * 4. Ensures zero UUID exposure in browser download history.
 * 5. Handles safe DOM anchor creation, download triggering, and asynchronous Object URL revocation.
 */

import axios from 'axios';

/**
 * Centralized MIME Type Resolver
 * Maps file extensions to exact, standard MIME types.
 */
export function getMimeType(filename) {
  if (!filename || typeof filename !== 'string') return 'application/octet-stream';
  const ext = filename.split('.').pop().toLowerCase();
  const mimeTypes = {
    pdf: 'application/pdf',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    xls: 'application/vnd.ms-excel',
    csv: 'text/csv;charset=utf-8;',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    doc: 'application/msword',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    zip: 'application/zip',
    txt: 'text/plain;charset=utf-8;',
    json: 'application/json',
    html: 'text/html;charset=utf-8;'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

/**
 * Extract filename from HTTP Content-Disposition header.
 * Supports standard RFC 2616 (filename="...") and RFC 5987 (filename*=UTF-8''...).
 */
export function parseContentDispositionFilename(header) {
  if (!header || typeof header !== 'string') return null;

  // 1. Try RFC 5987 encoded filename*=UTF-8''filename.ext
  const filenameStarMatch = header.match(/filename\*=UTF-8''([^;]+)/i);
  if (filenameStarMatch && filenameStarMatch[1]) {
    try {
      return decodeURIComponent(filenameStarMatch[1].trim());
    } catch (e) {
      console.warn('Failed to decode UTF-8 filename:', e);
    }
  }

  // 2. Try standard filename="filename.ext" or filename=filename.ext
  const filenameMatch = header.match(/filename=["']?([^"';]+)["']?/i);
  if (filenameMatch && filenameMatch[1]) {
    return filenameMatch[1].trim();
  }

  return null;
}

/**
 * Sanitize filename by removing path traversal and illegal OS filesystem characters.
 * Keeps spaces and standard Unicode characters.
 */
export function sanitizeFilename(filename, fallbackName = 'download.bin') {
  if (!filename || typeof filename !== 'string') return fallbackName;
  
  // Remove path traversal and directory paths
  let safeName = filename.replace(/^.*[\\/]/, '');
  // Remove illegal OS characters: / \ : * ? " < > |
  safeName = safeName.replace(/[/\\?%*:|"<>]/g, '_');
  // Trim spaces and leading dots
  safeName = safeName.trim().replace(/^\.+/, '');
  
  return safeName || fallbackName;
}

/**
 * Trigger direct native HTTP GET download to leverage server Content-Disposition headers.
 */
export function triggerDirectUrlDownload(url, filename = 'download.bin') {
  if (!url) return;
  const safeFilename = sanitizeFilename(filename, 'download.bin');
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', safeFilename);
  link.download = safeFilename;

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
  }, 1000);
}

/**
 * Open PDF or document inline in a new browser tab for viewing/previewing.
 */
export function viewDocumentInNewTab(url) {
  if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Download a Blob object directly with human-readable filename and preserved MIME type.
 */
export function downloadBlob(blob, filename = 'download.bin', mimeType = null) {
  if (!blob) {
    console.error('Cannot download null or undefined blob.');
    return;
  }

  const resolvedMime = mimeType || getMimeType(filename) || blob.type || 'application/pdf';
  const safeFilename = sanitizeFilename(filename, 'download.bin');

  const finalBlob = new Blob([blob], { type: resolvedMime });
  const blobUrl = window.URL.createObjectURL(finalBlob);

  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = blobUrl;
  link.setAttribute('download', safeFilename);
  link.download = safeFilename;

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
    window.URL.revokeObjectURL(blobUrl);
  }, 1500);
}

/**
 * Centralized HTTP Response Download Handler for Axios or Fetch responses.
 * Reads Content-Disposition and Content-Type headers, extracts filename, sanitizes, and triggers download.
 */
export function downloadFileFromResponse(response, fallbackFilename = 'download.bin', fallbackMimeType = null) {
  if (!response) {
    throw new Error('No HTTP response provided for file download.');
  }

  const headers = response.headers || {};
  const getHeader = (name) => {
    if (typeof headers.get === 'function') return headers.get(name) || headers.get(name.toLowerCase());
    return headers[name] || headers[name.toLowerCase()] || headers[name.toUpperCase()];
  };

  const contentDisposition = getHeader('Content-Disposition') || getHeader('content-disposition');
  const contentType = getHeader('Content-Type') || getHeader('content-type') || fallbackMimeType || getMimeType(fallbackFilename);

  // Extract server-provided filename
  let filename = parseContentDispositionFilename(contentDisposition);
  if (!filename) {
    filename = fallbackFilename;
  }

  filename = sanitizeFilename(filename, fallbackFilename);

  // Extract blob data from Axios or Fetch response
  const dataBlob = response.data instanceof Blob ? response.data : new Blob([response.data], { type: contentType });

  downloadBlob(dataBlob, filename, contentType);
}

/**
 * Unified Async File Download Utility
 */
export async function downloadFile({ url, fallbackFilename = 'download.bin', axiosConfig = {} }) {
  if (!url) throw new Error('Download URL is required.');
  
  const response = await axios.get(url, {
    responseType: 'blob',
    ...axiosConfig
  });

  downloadFileFromResponse(response, fallbackFilename);
}
