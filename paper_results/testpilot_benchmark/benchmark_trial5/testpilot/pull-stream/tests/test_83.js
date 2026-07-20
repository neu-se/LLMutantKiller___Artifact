let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with object (converts to array)', function(done) {
        const obj = { a: 'apple', b: 'banana', c: 'cherry' };
        pull_stream(
            pull_stream.values(obj),
            pull_stream.collect(function (err, results) {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(results, ['apple', 'banana', 'cherry']);
                done();
            })
        );
    });

    })