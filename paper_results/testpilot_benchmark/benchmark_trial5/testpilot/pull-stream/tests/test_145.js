let assert = require('assert');
let pull = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite with random generator', function(done) {
        let values = [];
        
        pull(
            pull.infinite(() => Math.floor(Math.random() * 100)),
            pull.take(3),
            pull.collect((err, results) => {
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