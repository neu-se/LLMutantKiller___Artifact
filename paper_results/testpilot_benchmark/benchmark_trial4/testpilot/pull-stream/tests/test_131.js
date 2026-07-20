let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite with object generator', function(done) {
        let id = 1;
        const generate = () => ({ id: id++, timestamp: Date.now() });
        
        pull_stream(
            pull_stream.infinite(generate),
            pull_stream.take(3),
            pull_stream.collect((err, results) => {
                if (err) return done(err);
                assert.equal(results.length, 3);
                assert.equal(results[0].id, 1);
                assert.equal(results[1].id, 2);
                assert.equal(results[2].id, 3);
                assert(results.every(obj => typeof obj.timestamp === 'number'));
                done();
            })
        );
    });

    })