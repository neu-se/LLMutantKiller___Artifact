let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - error in callback', function(done) {
        let mockObject = {
            dispatch: function(method, args) {
                // Simulate async error by calling the node resolver with error
                setTimeout(() => {
                    args[1][1](new Error('callback error'));
                }, 10);
                
                return q.resolve();
            }
        };
        
        let promise = q.makePromise.prototype.npost.call(mockObject, 'testMethod', ['arg1']);
        
        promise.then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'callback error');
            done();
        });
    });

    })