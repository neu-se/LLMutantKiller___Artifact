let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with resolved promise', function(done) {
        let resolvedPromise = q.resolve('success');
        
        q.catch(resolvedPromise, function(error) {
            // This should not be called
            done(new Error('Catch handler should not be called for resolved promise'));
        }).then(function(value) {
            assert.strictEqual(value, 'success');
            done();
        });
    });
    
    })