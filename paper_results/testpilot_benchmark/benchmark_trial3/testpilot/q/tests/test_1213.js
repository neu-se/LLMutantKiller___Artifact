let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - callback with error', function(done) {
        let mockObject = {
            dispatch: function(method, args) {
                assert.equal(method, 'post');
                assert.equal(args[0], 'testMethod');
                
                // Simulate async callback with error
                setTimeout(() => {
                    let nodeResolver = args[1][1]; // args + node resolver
                    nodeResolver(new Error('test error'));
                }, 10);
                
                return q.resolve();
            }
        };
        
        let promise = q.makePromise.prototype.npost.call(mockObject, 'testMethod', ['arg1']);
        
        promise.then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });

    })