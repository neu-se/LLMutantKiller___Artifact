let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.empty can be used multiple times', function(done) {
        let count = 0;
        let expectedCalls = 2;
        
        function testEmpty() {
            pull_stream(
                pull_stream.empty(),
                pull_stream.drain(
                    function(data) {
                        assert.fail('Empty stream should not emit any data');
                    },
                    function(err) {
                        assert.strictEqual(err, null);
                        count++;
                        if (count === expectedCalls) {
                            done();
                        }
                    }
                )
            );
        }
        
        testEmpty();
        testEmpty();
    });

    })