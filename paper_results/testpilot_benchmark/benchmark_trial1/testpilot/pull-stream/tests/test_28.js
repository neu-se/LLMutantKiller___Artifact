let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filter with predicate function', function(done) {
        const source = pull_stream.values([1, 2, 3, 4, 5, 6]);
        const isEven = (x) => x % 2 === 0;
        const expected = [2, 4, 6];
        const actual = [];
        
        pull_stream(
            source,
            pull_stream.filter(isEven),
            pull_stream.drain(
                (data) => actual.push(data),
                (err) => {
                    assert.strictEqual(err, null);
                    assert.deepStrictEqual(actual, expected);
                    done();
                }
            )
        );
    });

    })