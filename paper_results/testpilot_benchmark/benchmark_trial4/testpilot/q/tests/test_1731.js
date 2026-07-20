let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delete - should handle empty object', function(done) {
        let testObj = {};
        let result = q.delete(testObj, 'anyKey');
        
        assert.deepStrictEqual(testObj, {});
        done();
    });

    })