let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.through without op or onEnd', function(done) {
        let source = pull_stream.values([10, 20, 30]);
        
        let throughStream = pull_stream.through();
        
        pull_stream(
            source,
            throughStream,
            pull_stream.collect(function(err, results) {
                assert.equal(err, null);
                assert.deepEqual(results, [10, 20, 30]);
                done();
            })
        );
    });
});