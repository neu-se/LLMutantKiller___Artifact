let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.count handles end signal properly', function(done) {
        let countSource = pull_stream.count(5);
        
        // Manually call the source function to test end handling
        countSource(true, function(end) {
            assert.equal(end, true);
            done();
        });
    });
});