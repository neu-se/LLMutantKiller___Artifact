let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.collect with string values', function(done) {
        pull_stream(
            pull_stream.values(['hello', 'world', 'test']),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.deepEqual(results, ['hello', 'world', 'test']);
                done();
            })
        );
    });

    })