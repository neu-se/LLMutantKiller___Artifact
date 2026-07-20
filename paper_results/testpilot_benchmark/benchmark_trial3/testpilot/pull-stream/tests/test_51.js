let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once with valid value', function(done) {
        const testValue = 'hello world';
        const source = pull_stream.once(testValue);
        
        source(false, function(err, value) {
            assert.strictEqual(err, null);
            assert.strictEqual(value, testValue);
            
            // Second call should return true (end of stream)
            source(false, function(err2, value2) {
                assert.strictEqual(err2, true);
                assert.strictEqual(value2, undefined);
                done();
            });
        });
    });

    })