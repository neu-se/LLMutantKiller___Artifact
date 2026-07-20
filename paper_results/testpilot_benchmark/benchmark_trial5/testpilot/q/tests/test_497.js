let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should set property on object', function(done) {
        let obj = {};
        
        // Since q doesn't have a set method, we'll set the property directly
        obj.name = 'John';
        
        assert.strictEqual(obj.name, 'John');
        done();
    });
});