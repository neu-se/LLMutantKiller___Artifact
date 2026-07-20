let assert = require('assert');
let q = require('q');

function spread(value, fulfilled, rejected) {
    return q(value).spread(fulfilled, rejected);
}

describe('test q', function() {
    it('test q.spread with empty array', function(done) {
        let emptyArray = [];
        
        spread(emptyArray, function() {
            assert.equal(arguments.length, 0);
            done();
        }, function(error) {
            done(error);
        });
    });
});