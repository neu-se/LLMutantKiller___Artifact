let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.collect with mixed data types', function(done) {
        const testData = [1, 'string', { key: 'value' }, [1, 2, 3], null, true];
        pull_stream(
            pull_stream.values(testData),
            pull_stream.collect(function(err, result) {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(result, testData);
                done();
            })
        );
    });

    })