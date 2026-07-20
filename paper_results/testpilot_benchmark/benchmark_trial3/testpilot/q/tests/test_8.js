let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should fulfill a non-promise value', function(done) {
        let value = 'hello world';
        let promise = q(value);
        
        promise.then(function(result) {
            assert.strictEqual(result, value);
            done();
        }).catch(done);
    });
    
    })