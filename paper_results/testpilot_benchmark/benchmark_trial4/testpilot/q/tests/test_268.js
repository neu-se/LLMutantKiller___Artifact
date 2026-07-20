let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with null and undefined', function(done) {
        assert.equal(q.passByCopy(null), null);
        assert.equal(q.passByCopy(undefined), undefined);
        
        done();
    });
    
    })