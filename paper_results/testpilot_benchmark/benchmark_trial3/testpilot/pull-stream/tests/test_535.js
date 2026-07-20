let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.concat with array of buffers', function(done) {
        const buf1 = Buffer.from('hello');
        const buf2 = Buffer.from(' ');
        const buf3 = Buffer.from('world');
        
        pull_stream(
            pull_stream.values([buf1, buf2, buf3]),
            pull_stream.concat(function(err, result) {
                assert.strictEqual(err, null);
                assert.ok(Buffer.isBuffer(result));
                assert.strictEqual(result.toString(), 'hello world');
                done();
            })
        );
    });

    })