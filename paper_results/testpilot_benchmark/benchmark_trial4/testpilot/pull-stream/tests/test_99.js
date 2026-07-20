let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values reads all values sequentially', function(done) {
        const testArray = ['a', 'b', 'c'];
        const results = [];
        
        const source = pull_stream.values(testArray);
        
        function read() {
            source(null, function(end, data) {
                if (end === true) {
                    assert.deepStrictEqual(results, testArray);
                    done();
                    return;
                }
                if (end) {
                    done(end);
                    return;
                }
                results.push(data);
                read();
            });
        }
        
        read();
    });
});