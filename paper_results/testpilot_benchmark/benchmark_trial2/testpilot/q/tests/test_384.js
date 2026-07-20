let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with fulfilled promise', function(done) {
        let promise = q.resolve('success');
        
        q.when(promise, 
            function(value) {
                assert.equal(value, 'success');
                done();
            },
            function(error) {
                done(error);
            }
        );
    });

    })