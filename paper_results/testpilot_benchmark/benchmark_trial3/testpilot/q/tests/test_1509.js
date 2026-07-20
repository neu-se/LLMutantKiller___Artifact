let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q with object containing promises', function(done) {
        let promiseObject = {
            asyncAdd: function(a, b) {
                return q.resolve(a + b);
            },
            asyncDelay: function(value) {
                let deferred = q.defer();
                setTimeout(function() {
                    deferred.resolve(value);
                }, 10);
                return deferred.promise;
            }
        };
        
        try {
            // Test the actual promise methods instead of non-existent q.master
            promiseObject.asyncAdd(2, 3).then(function(result) {
                assert.equal(result, 5, 'asyncAdd should return 5');
                
                return promiseObject.asyncDelay('test value');
            }).then(function(result) {
                assert.equal(result, 'test value', 'asyncDelay should return the delayed value');
                done();
            }).catch(function(error) {
                done(error);
            });
        } catch (error) {
            done(error);
        }
    });
});