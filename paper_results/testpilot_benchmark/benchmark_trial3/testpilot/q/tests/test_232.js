let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.reject with number reason', function(done) {
        let reason = 404;
        let rejectedPromise = q.Promise.reject(reason);
        
        rejectedPromise.catch(function(error) {
            assert.strictEqual(error, reason);
            done();
        });
    });
    
    })