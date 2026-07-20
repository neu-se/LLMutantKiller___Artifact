let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filterNot with numbers', function(done) {
        const source = pull_stream.values([1, 2, 3, 4, 5, 6]);
        const isEven = (n) => n % 2 === 0;
        const result = [];
        
        pull_stream(
            source,
            pull_stream.filterNot(isEven),
            pull_stream.drain(
                (item) => result.push(item),
                (err) => {
                    if (err) return done(err);
                    assert.deepEqual(result, [1, 3, 5]);
                    done();
                }
            )
        );
    });

    })