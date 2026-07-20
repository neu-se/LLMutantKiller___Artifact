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

    it('should log deprecation warning when called', function() {
        // Create some test promises
        let promise1 = q.resolve('value1');
        let promise2 = q.resolve('value2');
        let promise3 = q.reject(new Error('test error'));

        // Call the deprecated function
        let result = q.allResolved([promise1, promise2, promise3]);

        // Verify a warning was logged
        assert.equal(consoleWarnings.length, 1);
        assert(consoleWarnings[0].message.includes('is deprecated'));
        assert(consoleWarnings[0].message.includes('instead'));
    });

    })