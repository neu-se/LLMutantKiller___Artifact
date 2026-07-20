let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should throw error when no done callback and error occurs', function(done) {
        let testError = new Error('test error');
        let source = function(end, cb) {
            if (end) return cb(end);
            cb(testError);
        };
        
        // Capture the thrown error
        let originalConsoleWarn = console.warn;
        console.warn = function() {}; // Suppress warning
        
        try {
            let drain = pull_stream.drain(function(data) {});
            pull_stream(source, drain);
        } catch (err) {
            console.warn = originalConsoleWarn;
            assert.strictEqual(err, testError);
            done();
            return;
        }
        
        console.warn = originalConsoleWarn;
        assert.fail('Should have thrown an error');
    });
});