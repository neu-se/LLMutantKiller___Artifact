let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should filter data', function(done) {
        let input = [1, 2, 3, 4, 5, 6];
        let expected = [2, 4, 6];
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.filter(x => x % 2 === 0),
            pull_stream.collect(function(err, data) {
                assert.equal(err, null);
                assert.deepEqual(data, expected);
                done();
            })
        );
    });
    
    })