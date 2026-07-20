let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenResolve with object value', function(done) {
        let promise = q.resolve('string value');
        let objectValue = { key: 'value', number: 123 };
        
        q.thenResolve(promise, objectValue)
            .then(function(result) {
                assert.deepStrictEqual(result, objectValue);
                done();
            })
            .catch(done);
    });
});