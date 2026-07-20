let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - multiple arguments', function(done) {
        let mockObject = {
            dispatch: function(method, args) {
                assert.equal(args[1].length, 4); // 3 original args + node resolver
                assert.equal(args[1][0], 'arg1');
                assert.equal(args[1][1], 'arg2');
                assert.equal(args[1][2], 'arg3');
                
                setTimeout(() => {
                    args[1][3](null, 'multiple args result');
                }, 10);
                
                return q.resolve();
            }
        };
        
        let promise = q.makePromise.prototype.npost.call(mockObject, 'testMethod', ['arg1', 'arg2', 'arg3']);
        
        promise.then(function(result) {
            assert.equal(result, 'multiple args result');
            done();
        }).catch(done);
    });
});