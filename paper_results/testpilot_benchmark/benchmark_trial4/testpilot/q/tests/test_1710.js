let mocha = require('mocha');
let assert = require('assert');
let Q = require('q');

describe('test q', function() {
    it('test q.set returns a promise', function(done) {
        let obj = { test: 'value' };
        let result = Q.set(obj, 'test', 'newValue');
        
        assert(Q.isPromise(result), 'q.set should return a promise');
        
        result.then(function(value) {
            assert.strictEqual(value, 'newValue');
            done();
        }).catch(done);
    });
});