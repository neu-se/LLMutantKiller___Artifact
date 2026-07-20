let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.empty - should work with pull pipeline', function(done) {
        const results = [];
        
        pull_stream(
            pull_stream.empty(),
            pull_stream.collect(function(err, items) {
                assert.strictEqual(err, null, 'Should not have error');
                assert.deepStrictEqual(items, [], 'Should collect empty array');
                done();
            })
        );
    });

    })