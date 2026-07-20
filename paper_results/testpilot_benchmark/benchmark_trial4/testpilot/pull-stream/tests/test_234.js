let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filter with empty stream', function(done) {
        const source = pull_stream.values([]);
        const filter = pull_stream.filter(x => true);
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