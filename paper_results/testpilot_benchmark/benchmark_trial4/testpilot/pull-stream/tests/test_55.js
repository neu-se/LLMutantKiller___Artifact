let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once with object value', function(done) {
        const testObj = { key: 'value', number: 42 };
        const source = pull_stream.once(testObj);
        
        source(false, function(end, data) {
            assert.strictEqual(end, null);
            assert.deepStrictEqual(data, testObj);
            done();
        });
    });
});