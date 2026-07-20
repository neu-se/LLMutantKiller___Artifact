let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.keys with nested object', function(done) {
        let testObj = { 
            name: 'test', 
            nested: { inner: 'value' }, 
            number: 42 
        };
        let promise = q(testObj);
        
        promise.keys().then(function(keys) {
            assert(Array.isArray(keys), 'keys should return an array');
            assert.deepEqual(keys.sort(), ['name', 'nested', 'number'], 'should return top-level keys only');
            done();
        }).catch(done);
    });
});