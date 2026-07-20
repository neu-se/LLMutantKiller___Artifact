let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite generator is called for each value', function(done) {
        let callCount = 0;
        
        pull_stream(
            pull_stream.infinite(() => {
                callCount++;
                return callCount;
            }),
            pull_stream.take(4),
            pull_stream.collect((err, results) => {
                if (err) return done(err);
                assert.equal(callCount, 4);
                assert.deepEqual(results, [1, 2, 3, 4]);
                done();
            })
        );
    });

    })