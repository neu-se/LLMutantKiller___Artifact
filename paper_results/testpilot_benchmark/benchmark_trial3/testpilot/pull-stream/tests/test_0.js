let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should process array data through pull stream', function(done) {
        let input = [1, 2, 3, 4, 5];
        let result = [];
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.collect(function(err, data) {
                assert.ifError(err);
                assert.deepEqual(data, input);
                done();
            })
        );
    });

    })