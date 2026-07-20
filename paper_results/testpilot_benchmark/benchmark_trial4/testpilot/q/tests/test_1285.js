let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap with resolved promise', function(done) {
        let tapped = false;
        let originalValue = 'test value';
        
        let promise = q.resolve(originalValue);
        
        q.tap(promise, function(value) {
            tapped = true;
            assert.equal(value, originalValue);
        }).then(function(result) {
            assert.equal(result, originalValue); // tap should pass through original value
            assert.equal(tapped, true); // callback should have been called
            done();
        }).catch(done);
    });
    
    })