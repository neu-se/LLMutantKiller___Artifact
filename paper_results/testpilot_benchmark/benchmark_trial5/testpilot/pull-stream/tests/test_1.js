let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should transform data using map', function(done) {
        let input = [1, 2, 3];
        let expected = [2, 4, 6];
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.map(x => x * 2),
            pull_stream.collect(function(err, data) {
                assert.equal(err, null);
                assert.deepEqual(data, expected);
                done();
            })
        );
    });
    
    })