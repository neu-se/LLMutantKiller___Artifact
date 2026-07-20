let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once with abort', function(done) {
        const testValue = 'test';
        const source = pull_stream.once(testValue);
        
        source(true, function(err, value) {
            assert.strictEqual(err, true);
            assert.strictEqual(value, undefined);
            done();
        });
    });

    })