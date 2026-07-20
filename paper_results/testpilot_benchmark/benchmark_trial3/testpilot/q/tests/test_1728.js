let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delete - should delete property with special characters', function(done) {
        let testObj = { 'normal-key': 'value1', 'key with spaces': 'value2', '123': 'value3' };
        q.delete(testObj, 'key with spaces');
        
        assert.strictEqual(testObj.hasOwnProperty('key with spaces'), false);
        assert.strictEqual(testObj['normal-key'], 'value1');
        assert.strictEqual(testObj['123'], 'value3');
        done();
    });
});