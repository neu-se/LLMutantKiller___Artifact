let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with undefined property', function(done) {
        let obj = { existing: 'value' };
        
        q.get(obj, 'nonexistent').then(function(result) {
            assert.equal(result, undefined);
            done();
        }).catch(done);
    });
    
    })