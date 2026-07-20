let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filter that filters out everything', function(done) {
        const source = pull_stream.values([1, 2, 3, 4, 5]);
        const filter = pull_stream.filter(x => x > 10); // nothing passes this test
        const results = [];
        
        pull_stream(
            source,
            filter,
            pull_stream.drain(
                item => results.push(item),
                err => {
                    if (err) return done(err);
                    assert.deepEqual(results, []);
                    done();
                }
            )
        );
    });

    })