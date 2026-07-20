let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap with non-promise value', function(done) {
        let tapped = false;
        let value = 42;
        
        q.tap(value, function(val) {
            tapped = true;
            assert.equal(val, value);
        }).then(function(result) {
            assert.equal(result, value); // should pass through original value
            assert.equal(tapped, true); // callback should have been called
            done();
        }).catch(done);
    });
});