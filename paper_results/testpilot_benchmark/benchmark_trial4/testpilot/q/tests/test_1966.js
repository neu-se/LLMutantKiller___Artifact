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

    it('should work with single promise', function(done) {
        let promise = q.resolve('single value');
        
        q.allResolved([promise])
            .then(function(results) {
                assert.equal(results.length, 1);
                assert.equal(results[0].state, 'fulfilled');
                assert.equal(results[0].value, 'single value');
                done();
            })
            .catch(done);
    });

});