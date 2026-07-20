let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with primitive values', function(done) {
        // Test with various primitive types
        assert.equal(q.passByCopy(42), 42);
        assert.equal(q.passByCopy('hello'), 'hello');
        assert.equal(q.passByCopy(true), true);
        assert.equal(q.passByCopy(null), null);
        assert.equal(q.passByCopy(undefined), undefined);
        
        done();
    });

    })