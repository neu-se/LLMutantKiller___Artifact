let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should fulfill undefined values', function(done) {
        let result = q(undefined);
        
        result.then(function(value) {
            assert.strictEqual(value, undefined);
            done();
        }).catch(done);
    });
    
    })