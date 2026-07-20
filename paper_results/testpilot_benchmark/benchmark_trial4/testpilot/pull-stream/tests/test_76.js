let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with object', function(done) {
        const testObject = { a: 1, b: 2, c: 'test' };
        const expectedValues = [1, 2, 'test'];
        const source = pull_stream.values(testObject);
        
        pull_stream(
            source,
            pull_stream.collect(function(err, data) {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(data, expectedValues);
                done();
            })
        );
    });

    })