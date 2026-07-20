let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with fulfilled promise', function(done) {
        let promise = q.resolve('success');
        
        // q.done should handle fulfilled promises without throwing
        try {
            q.done(promise, function(value) {
                assert.equal(value, 'success');
                done();
            });
        } catch (error) {
            done(error);
        }
    });

    })