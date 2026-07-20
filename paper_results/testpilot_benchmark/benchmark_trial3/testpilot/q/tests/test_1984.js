let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with multiple chained catches', function(done) {
        let promise = q.reject(new Error('Initial error'));
        
        q.catch(promise, function(error) {
            if (error.message === 'Initial error') {
                throw new Error('Second error');
            }
            return 'handled';
        }).catch(function(error) {
            assert.strictEqual(error.message, 'Second error');
            return 'finally handled';
        }).then(function(result) {
            assert.strictEqual(result, 'finally handled');
            done();
        }).catch(done);
    });
});