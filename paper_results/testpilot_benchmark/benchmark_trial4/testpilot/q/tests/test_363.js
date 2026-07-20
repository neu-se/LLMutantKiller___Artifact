let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test multiple passByCopy calls', function(done) {
        let promise = q.resolve('test');
        let firstPassByCopy = promise.passByCopy();
        let secondPassByCopy = firstPassByCopy.passByCopy();
        
        assert(q.isPromise(secondPassByCopy), 'Multiple passByCopy calls should work');
        
        secondPassByCopy.then(function(value) {
            assert.strictEqual(value, 'test', 'Should preserve value through multiple passByCopy calls');
            done();
        }).catch(done);
    });
});