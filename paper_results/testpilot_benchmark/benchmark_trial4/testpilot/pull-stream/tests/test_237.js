let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filter with predicate function', function(done) {
        const source = pull_stream.values([1, 2, 3, 4, 5, 6]);
        const isEven = (n) => n % 2 === 0;
        const results = [];
        
        pull_stream(
            source,
            pull_stream.filter(isEven),
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    assert.strictEqual(err, null);
                    assert.deepStrictEqual(results, [2, 4, 6]);
                    done();
                }
            )
        );
    });

    })