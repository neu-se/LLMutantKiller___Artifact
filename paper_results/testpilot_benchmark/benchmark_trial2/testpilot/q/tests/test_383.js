let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap with resolved promise', function(done) {
        let tappedValue = null;
        let originalValue = 'test value';
        
        let promise = q.resolve(originalValue);
        
        q.tap(promise, function(value) {
            tappedValue = value;
        }).then(function(result) {
            assert.equal(tappedValue, originalValue, 'tap callback should receive the original value');
            assert.equal(result, originalValue, 'tap should pass through the original value');
            done();
        }).catch(done);
    });
    
    })