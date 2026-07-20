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
        
        let setMethod = q.makePromise.prototype.set.bind(mockPromise);
        let result = setMethod(123, {nested: 'object'});
        
        result.then(function() {
            done();
        }).catch(done);
    });
});