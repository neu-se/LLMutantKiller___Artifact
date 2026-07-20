let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once with object value', function(done) {
        const testValue = { key: 'value', number: 42 };
        const source = pull_stream.once(testValue);
        
        source(false, function(err, value) {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(value, testValue);
            done();
        });
    });
});