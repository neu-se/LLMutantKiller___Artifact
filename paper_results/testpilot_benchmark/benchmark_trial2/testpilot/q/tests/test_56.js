let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise error handling without fallback', function(done) {
        let descriptor = {
            fargs: function(a) {
                return [a];
            },
            fcall: function(args) {
                throw new Error('Test error');
            }
        };
        
        let promiseFunc = q.makePromise(descriptor);
        
        promiseFunc('test')
            .then(function(result) {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Test error');
                done();
            });
    });
});