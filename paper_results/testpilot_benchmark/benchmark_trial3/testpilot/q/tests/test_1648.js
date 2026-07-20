let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with non-existent property', function(done) {
        let obj = { name: 'John' };
        let result = q.get(obj, 'nonexistent');
        
        result.then(function(value) {
            assert.strictEqual(value, undefined);
            done();
        }).catch(done);
    });

    })