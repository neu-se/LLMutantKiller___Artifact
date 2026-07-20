let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.reject with object reason', function(done) {
        let reason = { code: 500, message: 'Internal server error' };
        let rejectedPromise = q.Promise.reject(reason);
        
        rejectedPromise.catch(function(error) {
            assert.deepStrictEqual(error, reason);
            done();
        });
    });
    
    })