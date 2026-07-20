let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - successful call', function(done) {
        // Create a mock object that implements the dispatch method
        let mockObject = {
            dispatch: function(method, args) {
                // Simulate successful dispatch
                assert.equal(method, 'post');
                assert.equal(args[0], 'testMethod');
                assert.equal(args[1].length, 2); // original args + node resolver
                assert.equal(args[1][0], 'arg1');
                
                // Simulate async success by calling the node resolver
                setTimeout(() => {
                    args[1][1](null, 'success result');
                }, 10);
                
                return q.resolve();
            }
        };
        
        // Apply the npost method to our mock object
        let promise = q.makePromise.prototype.npost.call(mockObject, 'testMethod', ['arg1']);
        
        promise.then(function(result) {
            assert.equal(result, 'success result');
            done();
        }).catch(done);
    });

    })