let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    let originalConsoleWarn;
    let consoleWarnings = [];

    beforeEach(function() {
        // Capture console.warn calls
        originalConsoleWarn = console.warn;
        consoleWarnings = [];
        console.warn = function() {
            consoleWarnings.push(Array.prototype.slice.call(arguments));
        };
    });

    afterEach(function() {
        // Restore original console.warn
        console.warn = originalConsoleWarn;
    });

    it('should log deprecation warning when called', function() {
        // Create some promises to test with
        let promises = [
            q.resolve('success1'),
            q.resolve('success2'),
            q.reject(new Error('failure'))
        ];

        // Call the deprecated function
        let result = q.allResolved(promises);

        // Check that a warning was logged
        assert.equal(consoleWarnings.length, 1);
        assert(consoleWarnings[0][0].includes('deprecated'));
        assert(consoleWarnings[0][0].includes('allResolved'));
    });

    })