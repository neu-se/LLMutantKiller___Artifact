let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform with number argument', function(done) {
        // Test transforming a position (number argument)
        let delta = new quill_delta([{insert: 'Hello'}, {insert: ' World'}]);
        let result = delta.transform(3, false);
        assert(typeof result === 'number', 'Should return a number when transforming position');
        done();
    });
});