let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should chain multiple transformations', function(done) {
        let input = [1, 2, 3, 4, 5];
        let expected = [4, 8]; // filter odds, then double
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.filter(x => x % 2 === 0),
            pull_stream.map(x => x * 2),
            pull_stream.collect(function(err, data) {
                assert.ifError(err);
                assert.deepEqual(data, expected);
                done();
            })
        );
    });
});