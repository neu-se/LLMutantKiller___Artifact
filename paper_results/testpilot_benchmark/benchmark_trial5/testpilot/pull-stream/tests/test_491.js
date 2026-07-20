let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.find - finds string match', function(done) {
        pull_stream(
            pull_stream.values(['apple', 'banana', 'cherry']),
            pull_stream.find(x => x.startsWith('b'), (err, result) => {
                assert.strictEqual(err, null);
                assert.strictEqual(result, 'banana');
                done();
            })
        );
    });

    })