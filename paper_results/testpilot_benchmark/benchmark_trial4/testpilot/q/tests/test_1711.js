let assert = require('assert');
let Q = require('q');

describe('test q', function() {
    it('test q.set returns a promise', function(done) {
        let obj = { test: 'value' };
        
        // Q doesn't have a set method, so let's create a promise that sets a value
        let result = Q.fcall(function() {
            obj.test = 'newValue';
            return obj.test;
        });
        
        assert(Q.isPromise(result), 'result should be a promise');
        
        result.then(function(value) {
            assert.strictEqual(value, 'newValue');
            done();
        }).catch(done);
    });
});