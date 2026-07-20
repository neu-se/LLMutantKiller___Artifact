let assert = require('assert');
let pull_stream = require('pull-stream');

// Helper function to get nested property value
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

// Custom nonUnique transform
function nonUnique(fieldPath) {
    let seen = new Map();
    let duplicates = new Set();
    
    return pull_stream.through(function(data) {
        let value = getNestedValue(data, fieldPath);
        if (seen.has(value)) {
            duplicates.add(value);
            // Emit the first occurrence if we haven't already
            if (seen.get(value)) {
                this.queue(seen.get(value));
                seen.set(value, null); // Mark as already emitted
            }
            // Emit current duplicate
            this.queue(data);
        } else {
            seen.set(value, data);
        }
    });
}

it('.').reduce((current, key) => current && current[key], obj);
}

// Custom nonUnique transform
function nonUnique(fieldPath) {
    let seen = new Map();
    let duplicates = new Set();
    
    return pull_stream.through(function(data) {
        let value = getNestedValue(data, fieldPath);
        if (seen.has(value)) {
            duplicates.add(value);
            // Emit the first occurrence if we haven't already
            if (seen.get(value)) {
                this.queue(seen.get(value));
                seen.set(value, null); // Mark as already emitted
            }
            // Emit current duplicate
            this.queue(data);
        } else {
            seen.set(value, data);
        }
    });
}

it('.').reduce((current, key) => current && current[key], obj);
}

// Custom nonUnique transform
function nonUnique(fieldPath) {
    let seen = new Map();
    let duplicates = new Set();
    
    return pull_stream.through(function(data) {
        let value = getNestedValue(data, fieldPath);
        if (seen.has(value)) {
            duplicates.add(value);
            // Emit the first occurrence if we haven't already
            if (seen.get(value)) {
                this.queue(seen.get(value));
                seen.set(value, null); // Mark as already emitted
            }
            // Emit current duplicate
            this.queue(data);
        } else {
            seen.set(value, data);
        }
    });
}

describe('test pull_stream', function() {
    