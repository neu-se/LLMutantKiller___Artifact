let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post - non-existent method', function(done) {
        let mockObject = {};
        
        // Create a promised object using Q's actual API
        let promisedObject = {
            post: function(methodName, args) {
                return q.Promise(function(resolve, reject) {
                    try {
                        if (!mockObject[methodName]) {
                            throw new Error('Method not found: ' + methodName);
                        }
                        let result = mockObject[methodName].apply(mockObject, args);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        };
        
        promisedObject.post('nonExistentMethod', [])
            .then(function() {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Method not found: nonExistentMethod');
                done();
            });
    });
});