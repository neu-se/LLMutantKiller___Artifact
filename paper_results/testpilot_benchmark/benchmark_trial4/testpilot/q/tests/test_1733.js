let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delete - should delete property with special characters', function(done) {
        let testObj = { 'special-key': 'value', 'normal': 'data' };
        q.delete(testObj, 'special-key');
        
        assert.strictEqual(testObj.hasOwnProperty('special-key'), false);
        assert.strictEqual(testObj.normal, 'data');
        done();
    });

    })