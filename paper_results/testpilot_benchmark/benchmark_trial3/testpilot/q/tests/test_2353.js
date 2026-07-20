let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nodeify with rejected promise', function(done) {
        let rejectedError = new Error('test error');
        let promise = q.reject(rejectedError);
        
        q.nodeify(promise, function(err, result) {
            assert.strictEqual(err, rejectedError);
            assert.strictEqual(result, undefined);
            done();
        });
    });
    
    })