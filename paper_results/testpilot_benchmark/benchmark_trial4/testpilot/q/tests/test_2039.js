let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.finally callback returns resolved promise', function(done) {
        let originalValue = 'original';
        
        let promise = q.resolve(originalValue);
        
        promise.finally(function() {
            return q.resolve('finally value');
        }).then(function(value) {
            assert.strictEqual(value, originalValue, 'original value should be preserved even when finally returns a value');
            done();
        }).catch(done);
    });

    })