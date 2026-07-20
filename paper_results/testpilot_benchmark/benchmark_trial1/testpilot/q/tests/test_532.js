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

    it('should log deprecation warning when called', function(done) {
        let promises = [
            q.resolve('success1'),
            q.reject(new Error('error1')),
            q.resolve('success2')
        ];

        q.allResolved(promises).then(function(results) {
            // Check that deprecation warning was logged
            assert.equal(consoleWarnings.length, 1);
            assert(consoleWarnings[0].message.includes('is deprecated'));
            assert(consoleWarnings[0].message.includes('use'));
            assert(consoleWarnings[0].message.includes('instead'));
            
            // Verify the function still works as expected
            assert.equal(results.length, 3);
            
            // Check the actual structure - q.allResolved returns inspect objects
            assert.equal(results[0].state, 'fulfilled');
            assert.equal(results[0].value, 'success1');
            
            assert.equal(results[1].state, 'rejected');
            assert(results[1].reason instanceof Error);
            assert.equal(results[1].reason.message, 'error1');
            
            assert.equal(results[2].state, 'fulfilled');
            assert.equal(results[2].value, 'success2');
            
            done();
        }).catch(done);
    });

});