let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should fulfill immediate values', function(done) {
        let result = q(42);
        
        result.then(function(value) {
            assert.strictEqual(value, 42);
            done();
        }).catch(done);
    });
    
    })