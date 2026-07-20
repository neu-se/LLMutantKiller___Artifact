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

    it('should return a promise that resolves with promise states', function(done) {
        let promise1 = q.resolve('success');
        let promise2 = q.reject(new Error('failure'));
        
        q.allResolved([promise1, promise2])
            .then(function(results) {
                assert.equal(results.length, 2);
                assert.equal(results[0].state, 'fulfilled');
                assert.equal(results[0].value, 'success');
                assert.equal(results[1].state, 'rejected');
                assert(results[1].reason instanceof Error);
                done();
            })
            .catch(done);
    });

    })