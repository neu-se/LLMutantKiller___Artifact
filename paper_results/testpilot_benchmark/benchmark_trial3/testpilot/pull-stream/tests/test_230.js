let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filter filters out all items', function(done) {
        const source = pull_stream.values([1, 3, 5, 7, 9]);
        const isEven = (x) => x % 2 === 0;
        const results = [];
        
        pull_stream(
            source,
            pull_stream.filter(isEven),
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    assert.strictEqual(err, null);
                    assert.deepStrictEqual(results, []);
                    done();
                }
            )
        );
    });

    })