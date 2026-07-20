let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nodeify with plain value', function(done) {
        let plainValue = 42;
        
        q.nodeify(plainValue, function(err, result) {
            assert.strictEqual(err, null);
            assert.strictEqual(result, plainValue);
            done();
        });
    });
    
    })