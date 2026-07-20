let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with undefined property', function(done) {
        let testObj = { name: 'John' };
        
        q.get(testObj, 'nonexistent')
            .then(function(result) {
                assert.strictEqual(result, undefined);
                done();
            })
            .catch(done);
    });

    })