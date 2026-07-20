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

    it('should work with all resolved promises', function(done) {
        let promises = [
            q.resolve('a'),
            q.resolve('b'),
            q.resolve('c')
        ];

        q.allResolved(promises).then(function(results) {
            assert.equal(consoleWarnings.length, 1);
            assert.equal(results.length, 3);
            results.forEach(function(result) {
                assert.equal(result.state, 'fulfilled');
            });
            done();
        }).catch(done);
    });

    })