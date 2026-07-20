let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filterNot with strings', function(done) {
        const source = pull_stream.values(['apple', 'banana', 'cherry', 'date']);
        const startsWithA = (str) => str.startsWith('a');
        const result = [];
        
        pull_stream(
            source,
            pull_stream.filterNot(startsWithA),
            pull_stream.drain((item) => {
                result.push(item);
            }, (err) => {
                if (err) return done(err);
                assert.deepEqual(result, ['banana', 'cherry', 'date']);
                done();
            })
        );
    });

    })