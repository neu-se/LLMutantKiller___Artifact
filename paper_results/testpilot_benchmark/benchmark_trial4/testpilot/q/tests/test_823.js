let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.keys with nested object', function(done) {
        let testObj = { 
            name: 'test', 
            nested: { inner: 'value' }, 
            array: [1, 2, 3] 
        };
        let promise = q(testObj);
        
        promise.keys().then(function(keys) {
            assert.deepEqual(keys.sort(), ['array', 'name', 'nested']);
            done();
        }).catch(done);
    });

    })