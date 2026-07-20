let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once with onAbort callback', function(done) {
        const testValue = 'test';
        let abortCalled = false;
        
        const source = pull_stream.once(testValue, function() {
            abortCalled = true;
        });
        
        source(true, function(end, data) {
            assert.strictEqual(end, true);
            assert.strictEqual(data, undefined);
            assert.strictEqual(abortCalled, true);
            done();
        });
    });

    })