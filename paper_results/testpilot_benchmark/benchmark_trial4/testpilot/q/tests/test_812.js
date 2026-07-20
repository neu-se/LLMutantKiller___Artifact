let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - error handling', function(done) {
        function errorFunction(shouldError) {
            if (shouldError) {
                throw new Error('Test error');
            }
            return 'success';
        }
        
        // Use q.denodeify or create a promise-returning function
        let promiseFunc = function(shouldError) {
            return q.Promise(function(resolve, reject) {
                try {
                    let result = errorFunction(shouldError);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        };
        
        // Use q.fbind to bind the function with arguments
        let boundFunc = q.fbind(promiseFunc, true);
        
        boundFunc().then(function() {
            done(new Error('Should have thrown an error'));
        }).catch(function(error) {
            assert.equal(error.message, 'Test error');
            done();
        });
    });
});