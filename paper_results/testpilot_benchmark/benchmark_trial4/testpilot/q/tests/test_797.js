let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - error handling', function(done) {
        function errorFunction(shouldError) {
            if (shouldError) {
                throw new Error('Test error');
            }
            return q.resolve('success');
        }
        
        let promiseFunc = q.makePromise(errorFunction);
        let boundFunc = promiseFunc.fbind(true);
        
        boundFunc().then(function() {
            done(new Error('Should have thrown an error'));
        }).catch(function(error) {
            assert.equal(error.message, 'Test error');
            done();
        });
    });
    
    })