let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - node callback error', function(done) {
        let mockObject = {
            dispatch: function(method, args) {
                // Simulate node callback with error
                setTimeout(() => {
                    let nodeResolver = args[1][1];
                    nodeResolver(new Error('node callback error'));
                }, 10);
                
                return q.resolve();
            }
        };
        
        let promise = q.makePromise.prototype.npost.call(mockObject, 'testMethod', ['arg1']);
        
        promise.then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'node callback error');
            done();
        });
    });

    })