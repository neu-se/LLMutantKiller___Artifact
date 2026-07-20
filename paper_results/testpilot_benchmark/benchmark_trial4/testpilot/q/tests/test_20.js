let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should fulfill string values', function(done) {
        let result = q('hello world');
        
        result.then(function(value) {
            assert.strictEqual(value, 'hello world');
            done();
        }).catch(done);
    });
});