let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set with null should reject', function(done) {
        q.set(null, 'key', 'value')
            .then(function() {
                done(new Error('Expected rejection but got resolution'));
            })
            .catch(function(error) {
                assert(error instanceof Error);
                done();
            });
    });
    
    })