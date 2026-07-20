let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.catch - should not catch fulfilled promise', function(done) {
        let promise = q.resolve('success');
        let catchCalled = false;
        
        promise.catch(function(error) {
            catchCalled = true;
        }).then(function(value) {
            assert.strictEqual(value, 'success');
            assert.strictEqual(catchCalled, false);
            done();
        });
    });

    })