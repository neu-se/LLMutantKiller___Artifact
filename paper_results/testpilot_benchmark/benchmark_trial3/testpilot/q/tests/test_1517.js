let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

function spread(value, fulfilled, rejected) {
    return q(value).spread(fulfilled, rejected);
}

describe('test q', function() {
    it('test q.spread with resolved array', function(done) {
        let resolvedArray = [1, 2, 3];
        
        spread(resolvedArray, function(a, b, c) {
            assert.equal(a, 1);
            assert.equal(b, 2);
            assert.equal(c, 3);
            done();
        }, function(error) {
            done(error);
        });
    });

    })