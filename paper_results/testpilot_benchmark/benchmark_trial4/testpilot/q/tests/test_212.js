let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.all with empty array', function(done) {
        q.Promise.all([])
            .then(function(results) {
                assert.deepEqual(results, []);
                done();
            })
            .catch(done);
    });
    
    })