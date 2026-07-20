let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set with plain object', function(done) {
        let plainObject = { existingKey: 'existingValue' };
        
        q.set(plainObject, 'newKey', 'newValue')
            .then(function(result) {
                // The result should be the modified object
                assert.strictEqual(result.newKey, 'newValue');
                assert.strictEqual(result.existingKey, 'existingValue');
                done();
            })
            .catch(done);
    });
    
    })