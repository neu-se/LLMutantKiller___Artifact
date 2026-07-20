let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with empty array', function(done) {
        // Test spreading an empty array
        q.all([])
            .spread(function() {
                assert.equal(arguments.length, 0);
                return 'empty';
            })
            .then(function(result) {
                assert.equal(result, 'empty');
                done();
            })
            .catch(done);
    });

    })