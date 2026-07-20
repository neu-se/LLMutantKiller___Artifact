let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with null object', function(done) {
        let result = q.get(null, 'property');
        
        result.then(function(value) {
            assert.strictEqual(value, undefined);
            done();
        }).catch(done);
    });

    })