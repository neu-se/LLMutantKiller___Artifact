let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.dispatch - with rejection', function(done) {
        let mockPromise = {
            promiseDispatch: function(resolve, op, args) {
                // Simulate operation that throws an error
                throw new Error('operation failed');
            }
        };
        
        let dispatch = q.makePromise.prototype.dispatch.bind(mockPromise);
        let promise = dispatch('failOp', []);
        
        promise.then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'operation failed');
            done();
        });
    });

    })