#!/bin/bash
# Preview the website locally, before committing/pushing changes.
# Run this from anywhere with:  ./preview.sh
cd "$(dirname "$0")"
echo "Starting local preview..."
echo "Once it says 'Server running...', open http://localhost:4000 in your browser."
echo "Press Control+C to stop."
echo ""
LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 bundle exec jekyll serve --config _config.yml,_config.dev.yml
