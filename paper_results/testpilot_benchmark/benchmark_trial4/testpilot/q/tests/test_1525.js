let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

function spread(value, fulfilled, rejected) {
    return q(value).spread(fulfilled, rejected);
}

describe('test q', function() {
    it('test q.spread with promise resolving to array', function(done) {
        let promiseValue = q.resolve([10, 20, 30]);
        
        spread(promiseValue, function(x, y, z) {
            assert.equal(x, 10);
            assert.equal(y, 20);
            assert.equal(z, 30);
            done();
        }, function(error) {
            done(error);
        });
    });

    })