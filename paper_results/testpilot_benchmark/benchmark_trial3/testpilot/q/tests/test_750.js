let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke - nonexistent method should reject', function(done) {
        let testObj = {
            existingMethod: function() {
                return 'exists';
            }
        };
        
        let promise = q.makePromise(testObj);
        
        promise.invoke('nonexistentMethod')
            .then(function(result) {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert(error instanceof Error);
                done();
            });
    });
});