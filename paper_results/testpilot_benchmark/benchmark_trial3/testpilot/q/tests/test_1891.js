let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.keys with empty object', function(done) {
        let obj = {};
        q.keys(obj)
            .then(function(keys) {
                assert.deepEqual(keys, []);
                done();
            })
            .catch(done);
    });

    })