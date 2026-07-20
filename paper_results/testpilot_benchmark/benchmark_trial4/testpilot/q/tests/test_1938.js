let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should resolve immediately with empty array', function(done) {
        q.any([])
            .then(result => {
                assert.equal(result, undefined);
                done();
            })
            .catch(done);
    });

    })