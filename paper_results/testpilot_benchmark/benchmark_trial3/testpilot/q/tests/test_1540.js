let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.async with generator that propagates rejection', function(done) {
        function* testGenerator() {
            yield q.reject(new Error('unhandled error'));
        }
        
        let asyncFn = q.async(testGenerator);
        asyncFn().then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'unhandled error');
            done();
        });
    });
});