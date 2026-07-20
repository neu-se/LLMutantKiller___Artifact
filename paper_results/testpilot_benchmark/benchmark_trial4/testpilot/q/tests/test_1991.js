let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with error thrown in catch handler', function(done) {
        let promise = q.reject(new Error('Original error'));
        
        q.catch(promise, function(error) {
            throw new Error('New error from catch handler');
        }).then(function(result) {
            done(new Error('Should not reach then handler'));
        }).catch(function(error) {
            assert(error instanceof Error);
            assert.strictEqual(error.message, 'New error from catch handler');
            done();
        });
    });

    })