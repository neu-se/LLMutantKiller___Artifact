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
        
        process.once('uncaughtException', function(err) {
            console.warn = originalConsoleWarn; // Restore console.warn
            assert.strictEqual(err, testError);
            done();
        });
        
        let sink = pull_stream.drain(function(data) {});
        pull_stream(source, sink);
    });
});