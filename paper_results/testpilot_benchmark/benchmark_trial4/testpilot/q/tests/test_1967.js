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

    it('should work with empty array', function(done) {
        q.allResolved([])
            .then(function(results) {
                assert.equal(results.length, 0);
                assert(Array.isArray(results));
                done();
            })
            .catch(done);
    });

});