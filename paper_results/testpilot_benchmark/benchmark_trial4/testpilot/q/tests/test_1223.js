let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - no args provided', function(done) {
        let mockObject = {
            dispatch: function(method, args) {
                assert.equal(method, 'post');
                assert.equal(args[0], 'testMethod');
                assert.equal(args[1].length, 1); // only node resolver, no other args
                
                setTimeout(() => {
                    let nodeResolver = args[1][0];
                    nodeResolver(null, 'no args result');
                }, 10);
                
                return q.resolve();
            }
        };
        
        let promise = q.makePromise.prototype.npost.call(mockObject, 'testMethod');
        
        promise.then(function(result) {
            assert.equal(result, 'no args result');
            done();
        }).catch(done);
    });
});