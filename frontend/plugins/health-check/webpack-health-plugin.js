find . -type f -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/.emergent/*' && cat package.json && cat frontend/package.json
