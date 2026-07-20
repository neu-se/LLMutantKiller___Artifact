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

    it('should handle console being undefined', function(done) {
        // Temporarily remove console
        let originalConsoleObj = global.console;
        delete global.console;

        let promises = [q.resolve(1)];

        q.allResolved(promises).then(function(results) {
            // Should not throw error even without console
            assert.equal(results.length, 1);
            assert.equal(results[0].state, 'fulfilled');
            
            // Restore console
            global.console = originalConsoleObj;
            done();
        }).catch(function(err) {
            // Restore console in case of error
            global.console = originalConsoleObj;
            done(err);
        });
    });
});