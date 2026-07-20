let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap with non-promise value', function(done) {
        let tappedValue = null;
        let originalValue = 42;
        
        q.tap(originalValue, function(value) {
            tappedValue = value;
        }).then(function(result) {
            assert.strictEqual(tappedValue, originalValue, 'tap callback should receive the original value');
            assert.strictEqual(result, originalValue, 'tap should pass through the original value');
            done();
        }).catch(done);
    });
    
    })