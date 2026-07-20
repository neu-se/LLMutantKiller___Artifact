let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values reads all values sequentially', function(done) {
        const testArray = ['a', 'b', 'c'];
        const results = [];
        let callCount = 0;
        
        const source = pull_stream.values(testArray);
        
        function read() {
            source(null, function(end, data) {
                callCount++;
                if (end) {
                    assert.strictEqual(callCount, 4); // 3 data calls + 1 end call
                    assert.deepStrictEqual(results, testArray);
                    done();
                    return;
                }
                results.push(data);
                read(); // Continue reading
            });
        }
        
        read();
    });
});