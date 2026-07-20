let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite with object generator', function(done) {
        let id = 0;
        
        pull_stream(
            pull_stream.infinite(() => ({ id: id++, name: `item${id - 1}` })),
            pull_stream.take(2),
            pull_stream.collect((err, results) => {
                if (err) return done(err);
                assert.equal(results.length, 2);
                assert.equal(results[0].id, 0);
                assert.equal(results[0].name, 'item0');
                assert.equal(results[1].id, 1);
                assert.equal(results[1].name, 'item1');
                done();
            })
        );
    });

    })