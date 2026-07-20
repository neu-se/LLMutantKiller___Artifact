let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with rejected promise returned from catch handler', function(done) {
        let promise = q.reject(new Error('Original error'));
        
        q.catch(promise, function(error) {
            return q.reject(new Error('Catch handler rejection'));
        }).then(function(result) {
            done(new Error('Should not reach then handler'));
        }).catch(function(error) {
            assert(error instanceof Error);
            assert.strictEqual(error.message, 'Catch handler rejection');
            done();
        });
    });
});