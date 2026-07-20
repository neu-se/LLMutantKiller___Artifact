let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with single element array', function(done) {
        let promise = q.resolve(['hello']);
        
        promise.spread(function(value) {
            assert.equal(value, 'hello');
            assert.equal(arguments.length, 1);
            done();
        }, function(error) {
            done(error);
        });
    });

    })