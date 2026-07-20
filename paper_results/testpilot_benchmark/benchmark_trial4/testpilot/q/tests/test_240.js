let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.reject with undefined reason', function(done) {
        let rejectedPromise = q.Promise.reject(undefined);
        
        rejectedPromise.catch(function(error) {
            assert.strictEqual(error, undefined);
            done();
        });
    });
    
    })