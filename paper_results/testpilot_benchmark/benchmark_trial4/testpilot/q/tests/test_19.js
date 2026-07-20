let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should fulfill objects without then method', function(done) {
        let obj = { foo: 'bar' };
        let result = q(obj);
        
        result.then(function(value) {
            assert.strictEqual(value, obj);
            assert.strictEqual(value.foo, 'bar');
            done();
        }).catch(done);
    });
    
    })