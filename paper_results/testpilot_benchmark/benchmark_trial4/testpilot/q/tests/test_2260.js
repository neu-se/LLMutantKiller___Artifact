let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify - error handling', function(done) {
        // Create a Node.js style function that produces an error
        function errorFunction(shouldError, callback) {
            setTimeout(() => {
                if (shouldError) {
                    callback(new Error('Test error'));
                } else {
                    callback(null, 'success');
                }
            }, 10);
        }
        
        const promisified = q.denodeify(errorFunction);
        
        // Test error case
        promisified(true)
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(err => {
                assert.strictEqual(err.message, 'Test error');
                done();
            });
    });
    
    })