let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.onEnd with empty stream', function(done) {
        let callbackCalled = false;
        
        pull_stream(
            pull_stream.values([]),
            pull_stream.onEnd(function(err) {
                callbackCalled = true;
                assert.strictEqual(err, null, 'Should not have an error for empty stream');
                done();
            })
        );
    });

    })