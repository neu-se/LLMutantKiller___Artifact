let mocha = require('mocha');
let assert = require('assert');
let Q = require('q');

describe('test q', function() {
    it('test q.set with numeric key', function(done) {
        let obj = {};
        
        Q.set(obj, 123, 'numeric key')
            .then(function(result) {
                assert.equal(obj[123], 'numeric key');
                done();
            })
            .catch(done);
    });

    })