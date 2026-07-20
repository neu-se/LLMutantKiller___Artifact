let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filter with strings', function(done) {
        const source = pull_stream.values(['apple', 'banana', 'cherry', 'date']);
        const startsWithA = (str) => str.startsWith('a');
        const result = [];
        
        pull_stream(
            source,
            pull_stream.filter((str) => !startsWithA(str)),
            pull_stream.drain((item) => {
                result.push(item);
            }, (err) => {
                if (err) return done(err);
                assert.deepEqual(result, ['banana', 'cherry', 'date']);
                done();
            })
        );
    });
});