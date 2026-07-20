let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.catch - should catch rejection', function(done) {
        let promise = q.reject(new Error('test error'));
        
        promise.catch(function(error) {
            assert.strictEqual(error.message, 'test error');
            done();
        });
    });

    })