let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.count increments correctly', function(done) {
        let countSource = pull_stream.count(2);
        let results = [];
        
        function readNext() {
            countSource(null, function(end, data) {
                if (end === true) {
                    assert.deepEqual(results, [0, 1, 2]);
                    done();
                    return;
                }
                assert.ifError(end);
                results.push(data);
                readNext();
            });
        }
        
        readNext();
    });
});