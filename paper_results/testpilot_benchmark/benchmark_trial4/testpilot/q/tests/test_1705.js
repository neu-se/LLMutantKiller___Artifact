let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set with undefined value', function(done) {
        let obj = { key: 'value' };
        
        q.set(obj, 'key', undefined)
            .then(function(result) {
                assert.strictEqual(result.key, undefined);
                done();
            })
            .catch(done);
    });
});