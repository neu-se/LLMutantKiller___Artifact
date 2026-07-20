let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap with rejected promise', function(done) {
        let tapCalled = false;
        let error = new Error('test error');
        
        let promise = q.reject(error);
        
        q.tap(promise, function(value) {
            tapCalled = true;
        }).then(function(result) {
            done(new Error('Promise should have been rejected'));
        }).catch(function(err) {
            assert.strictEqual(tapCalled, false, 'tap callback should not be called for rejected promises');
            assert.strictEqual(err, error, 'original error should be preserved');
            done();
        });
    });
    
    })