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
        // Create some test promises
        let promise1 = q.resolve('value1');
        let promise2 = q.reject(new Error('test error'));
        
        // Call the deprecated function
        let result = q.allResolved([promise1, promise2]);
        
        // Check that a warning was logged
        assert.equal(consoleWarnings.length, 1);
        assert(consoleWarnings[0][0].includes('deprecated'));
    });

});