let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filterNot keeps all items', function(done) {
        const source = pull_stream.values([1, 2, 3, 4, 5]);
        const alwaysFalse = () => false;
        const result = [];
        
        pull_stream(
            source,
            pull_stream.filterNot(alwaysFalse),
            pull_stream.drain(
                (data) => result.push(data),
                (err) => {
                    if (err) return done(err);
                    assert.deepEqual(result, [1, 2, 3, 4, 5]);
                    done();
                }
            )
        );
    });
});