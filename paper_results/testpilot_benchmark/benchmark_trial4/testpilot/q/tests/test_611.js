let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with fulfilled promise', function(done) {
        let promise = q.resolve([10, 20]);
        
        promise.spread(function(x, y) {
            assert.equal(x, 10);
            assert.equal(y, 20);
            assert.equal(x + y, 30);
            done();
        }, function(error) {
            done(error);
        });
    });

    })