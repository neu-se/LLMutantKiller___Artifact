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

    it('should handle mixed resolved and rejected promises', function(done) {
        let promises = [
            q.resolve(1),
            q.resolve(2),
            q.reject(new Error('error')),
            q.resolve(3)
        ];
        
        q.allResolved(promises)
            .then(function(results) {
                assert.equal(results.length, 4);
                assert.equal(results[0].state, 'fulfilled');
                assert.equal(results[1].state, 'fulfilled');
                assert.equal(results[2].state, 'rejected');
                assert.equal(results[3].state, 'fulfilled');
                done();
            })
            .catch(done);
    });
});