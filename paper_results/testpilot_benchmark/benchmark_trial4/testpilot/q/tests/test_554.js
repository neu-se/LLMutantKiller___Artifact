let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isPending - with Q.when resolved', function(done) {
        let promise = q.when('immediate value');
        
        assert.strictEqual(promise.isPending(), false, 'Promise created with Q.when should not be pending');
        done();
    });
    
    })