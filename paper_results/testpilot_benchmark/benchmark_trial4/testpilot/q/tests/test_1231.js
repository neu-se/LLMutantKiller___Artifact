let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - method with error', function(done) {
        let mockObject = {
            errorMethod: function(callback) {
                setTimeout(() => {
                    callback(new Error('Test error'));
                }, 10);
            }
        };
        
        let promisedObject = q.makePromise(mockObject, function(name, args) {
            return mockObject[name].apply(mockObject, args);
        });
        
        promisedObject.npost('errorMethod', [])
            .then(function() {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Test error');
                done();
            });
    });
});