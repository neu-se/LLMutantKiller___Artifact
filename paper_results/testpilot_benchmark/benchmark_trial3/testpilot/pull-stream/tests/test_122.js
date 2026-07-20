let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite can be terminated early', function(done) {
        const generate = () => 'infinite';
        let count = 0;
        
        pull_stream(
            pull_stream.infinite(generate),
            pull_stream.through((data) => {
                count++;
                if (count >= 5) {
                    return false; // terminate stream
                }
                return data;
            }),
            pull_stream.collect((err, results) => {
                if (err) return done(err);
                assert(results.length <= 5);
                done();
            })
        );
    });
});