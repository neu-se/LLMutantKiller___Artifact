let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should throw error when no done callback is provided and error occurs', function() {
        let testError = new Error('test error');
        let source = function(end, cb) {
            if (end) return cb(end);
            cb(testError);
        };
        let drain = pull_stream.drain(function(data) {});
        
        assert.throws(function() {
            pull_stream(source, drain);
        }, testError);
    });
});