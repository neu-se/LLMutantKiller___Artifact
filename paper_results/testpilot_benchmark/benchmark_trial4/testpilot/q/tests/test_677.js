let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set with different data types', function(done) {
        let mockPromise = {
            dispatch: function(method, args) {
                assert.equal(method, 'set');
                assert.equal(args[0], 123);
                assert.deepEqual(args[1], {nested: 'object'});
                return q.resolve('success');
            }
        };
        
        let result = q.makePromise.prototype.set.call(mockPromise, 123, {nested: 'object'});
        
        result.then(function(value) {
            assert.equal(value, 'success');
            done();
        }).catch(done);
    });
});