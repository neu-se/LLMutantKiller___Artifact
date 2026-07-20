let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - object property access', function(done) {
        let obj = { name: 'test', value: 123 };
        let promise = q.fulfill(obj);
        
        q.get(promise, 'name').then(function(result) {
            assert.strictEqual(result, 'test');
            return q.get(promise, 'value');
        }).then(function(result) {
            assert.strictEqual(result, 123);
            done();
        }).catch(done);
    });

    })