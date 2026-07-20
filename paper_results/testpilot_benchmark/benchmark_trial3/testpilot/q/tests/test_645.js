let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.dispatch - non-existent method', function(done) {
        let testObject = {
            existingMethod: function() {
                return 'exists';
            }
        };
        
        let promise = q.makePromise(testObject);
        let result = promise.dispatch('nonExistentMethod', []);
        
        result.then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert(error instanceof Error);
            done();
        });
    });
});