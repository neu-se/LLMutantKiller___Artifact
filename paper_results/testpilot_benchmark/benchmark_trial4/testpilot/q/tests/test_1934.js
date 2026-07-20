let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.any - handles empty array', function(done) {
        q.any([])
            .then(() => {
                done(new Error('Should have rejected with empty array'));
            })
            .catch(error => {
                assert(error instanceof Error);
                done();
            });
    });
    
    })