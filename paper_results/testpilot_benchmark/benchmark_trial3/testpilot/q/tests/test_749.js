let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke - method that throws error', function(done) {
        let testObj = {
            throwError: function() {
                throw new Error('Test error');
            }
        };
        
        let promise = q.makePromise(testObj);
        
        promise.invoke('throwError')
            .then(function(result) {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Test error');
                done();
            });
    });
});