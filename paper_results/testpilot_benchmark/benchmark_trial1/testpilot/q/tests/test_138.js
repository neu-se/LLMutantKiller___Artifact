let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post - non-existent method', function(done) {
        let mockObject = {
            existingMethod: function(callback) {
                callback(null, 'exists');
            }
        };
        
        let promiseObject = q.makePromise(mockObject);
        
        promiseObject.post('nonExistentMethod', [])
            .then(function(result) {
                done(new Error('Should have thrown an error for non-existent method'));
            })
            .catch(function(error) {
                assert(error instanceof Error);
                done();
            });
    });
});