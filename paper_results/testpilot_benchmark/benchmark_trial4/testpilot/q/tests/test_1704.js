let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set with null value', function(done) {
        let obj = { key: 'value' };
        
        q.set(obj, 'key', null)
            .then(function(result) {
                assert.strictEqual(result.key, null);
                done();
            })
            .catch(done);
    });
    
    })