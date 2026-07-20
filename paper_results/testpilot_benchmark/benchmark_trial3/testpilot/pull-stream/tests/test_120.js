let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite with random number generator', function(done) {
        const generate = () => Math.floor(Math.random() * 100);
        
        pull_stream(
            pull_stream.infinite(generate),
            pull_stream.take(10),
            pull_stream.collect((err, results) => {
                if (err) return done(err);
                assert.equal(results.length, 10);
                results.forEach(num => {
                    assert(typeof num === 'number');
                    assert(num >= 0 && num < 100);
                });
                done();
            })
        );
    });

    })