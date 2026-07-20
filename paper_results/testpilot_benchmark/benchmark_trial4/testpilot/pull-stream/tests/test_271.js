let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filterNot keeps all items', function(done) {
        const source = pull_stream.values([1, 2, 3, 4, 5]);
        const alwaysFalse = () => false;
        const result = [];
        
        pull_stream(
            source,
            pull_stream.filter((item) => !alwaysFalse(item)),
            pull_stream.drain((item) => {
                result.push(item);
            }, (err) => {
                if (err) return done(err);
                assert.deepEqual(result, [1, 2, 3, 4, 5]);
                done();
            })
        );
    });
});