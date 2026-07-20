let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once with valid value', function(done) {
        const testValue = 'hello world';
        const source = pull_stream.once(testValue);
        
        source(false, function(end, data) {
            assert.strictEqual(end, null);
            assert.strictEqual(data, testValue);
            
            // Second call should return end=true
            source(false, function(end2, data2) {
                assert.strictEqual(end2, true);
                assert.strictEqual(data2, undefined);
                done();
            });
        });
    });

    })