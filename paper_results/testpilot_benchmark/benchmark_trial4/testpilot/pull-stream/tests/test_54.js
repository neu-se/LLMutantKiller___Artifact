let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once with empty string', function(done) {
        const source = pull_stream.once('');
        
        source(false, function(end, data) {
            assert.strictEqual(end, null);
            assert.strictEqual(data, '');
            done();
        });
    });

    })