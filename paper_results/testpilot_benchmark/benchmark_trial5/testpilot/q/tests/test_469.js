let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with regular object property', function(done) {
        let obj = { name: 'John', age: 30 };
        let result = q.get(obj, 'name');
        
        q.when(result, function(value) {
            assert.strictEqual(value, 'John');
            done();
        }).catch(done);
    });

    })