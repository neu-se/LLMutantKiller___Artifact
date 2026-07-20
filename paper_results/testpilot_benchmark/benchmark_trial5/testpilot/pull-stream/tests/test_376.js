let assert = require('assert');
let pull_stream = require('pull-stream');

// Custom nonUnique transform that filters for duplicate values based on a nested field path
function nonUnique(path) {
    const seen = new Set();
    const duplicates = [];
    
    return pull_stream.through(function(data) {
        // Get nested property value using dot notation
        const value = path.split('.').reduce((obj, key) => obj && obj[key], data);
        
        if (seen.has(value)) {
            // This is a duplicate, add to duplicates array
            if (!duplicates.some(item => {
                const itemValue = path.spl