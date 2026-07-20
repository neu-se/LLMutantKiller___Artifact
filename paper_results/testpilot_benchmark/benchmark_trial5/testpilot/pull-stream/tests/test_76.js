let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with object', function(done) {
        const testObject = { a: 1, b: 2, c: 3 };
        const source = pull_stream.values(testObject);
        const results = [];
        
        pull_stream(
            source,
            pull_stream.drain(function(data) {
                results.push(data);
            }, function(err) {
                assert.strictEqual(err, true);
                assert.deepStrictEqual(results, [1, 2, 3]);
                done();
            })
        );
    });

    })