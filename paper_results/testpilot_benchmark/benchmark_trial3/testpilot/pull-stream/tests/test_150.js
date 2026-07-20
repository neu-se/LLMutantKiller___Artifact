let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.empty - multiple reads should all return end', function(done) {
        let emptyStream = pull_stream.empty();
        let readCount = 0;
        
        function testRead() {
            emptyStream(null, function(end, data) {
                readCount++;
                assert.strictEqual(end, true, `Read ${readCount} should end`);
                assert.strictEqual(data, undefined, `Read ${readCount} should have no data`);
                
                if (readCount < 3) {
                    testRead();
                } else {
                    done();
                }
            });
        }
        
        testRead();
    });
});