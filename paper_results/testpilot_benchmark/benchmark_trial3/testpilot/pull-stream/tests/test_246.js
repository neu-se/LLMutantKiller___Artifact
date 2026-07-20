let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filterNot with empty stream', function(done) {
        const source = pull_stream.values([]);
        const alwaysTrue = () => true;
        const result = [];
        
        pull_stream(
            source,
            pull_stream.filterNot(alwaysTrue),
            pull_stream.drain(
                (item) => result.push(item),
                (err) => {
                    if (err) return done(err);
                    assert.deepEqual(result, []);
                    done();
                }
            )
        );
    });

    })