let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite with random generator', function(done) {
        let values = [];
        
        pull_stream(
            pull_stream.infinite(() => Math.floor(Math.random() * 100)),
            pull_stream.take(3),
            pull_stream.collect((err, results) => {
                if (err) return done(err);
                assert.equal(results.length, 3);
                // Verify all values are numbers between 0 and 99
                results.forEach(val => {
                    assert.equal(typeof val, 'number');
                    assert(val >= 0 && val < 100);
                });
                done();
            })
        );
    });
});