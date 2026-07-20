let assert = require('assert');
let q = require('q');

function spread(value, fulfilled, rejected) {
    return q(value).spread(fulfilled, rejected);
}

describe('test q', function() {
    it('test q.spread with single element array', function(done) {
        let singleElement = [42];
        
        spread(singleElement, function(value) {
            assert.equal(value, 42);
            assert.equal(arguments.length, 1);
            done();
        }, function(error) {
            done(error);
        });
    });
});