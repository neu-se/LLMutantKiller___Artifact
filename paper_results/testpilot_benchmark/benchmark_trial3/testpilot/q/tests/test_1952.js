let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    let originalConsole;
    let consoleWarnings = [];

    beforeEach(function() {
        // Mock console.warn to capture warnings
        originalConsole = console.warn;
        consoleWarnings = [];
        console.warn = function(message, stack) {
            consoleWarnings.push({ message, stack });
        };
    });

    afterEach(function() {
        // Restore original console.warn
        console.warn = originalConsole;
    });

    it('should work with empty array', function(done) {
        q.allResolved([]).then(function(results) {
            assert.equal(consoleWarnings.length, 1);
            assert.equal(results.length, 0);
            done();
        }).catch(done);
    });

    })