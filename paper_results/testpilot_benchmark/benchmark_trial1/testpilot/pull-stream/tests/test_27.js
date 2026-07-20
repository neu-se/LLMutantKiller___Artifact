let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filter with numbers', function(done) {
        const source = pull_stream.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        const filter = pull_stream.filter(x => x % 2 === 0); // filter even numbers
        const results = [];
        
        pull_stream(
            source,
            filter,
            pull_stream.drain(
                item => results.push(item),
                err => {
                    if (err) return done(err);
                    assert.deepEqual(results, [2, 4, 6, 8, 10]);
                    done();
                }
            )
        );
    });

    })