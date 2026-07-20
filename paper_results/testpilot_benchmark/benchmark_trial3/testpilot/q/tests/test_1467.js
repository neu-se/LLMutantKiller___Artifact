let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - object property setting', function(done) {
        let obj = { name: 'original' };
        let promise = q.fulfill(obj);
        
        q.set(promise, 'name', 'modified').then(function() {
            return q.get(promise, 'name');
        }).then(function(result) {
            assert.strictEqual(result, 'modified');
            assert.strictEqual(obj.name, 'modified');
            done();
        }).catch(done);
    });

    })