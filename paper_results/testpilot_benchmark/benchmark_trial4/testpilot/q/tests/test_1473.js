let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - set method modifies properties', function(done) {
        let testObj = { existing: 'old' };
        let promise = q.fulfill(testObj);
        
        promise.set('existing', 'new');
        promise.set('newProp', 'newValue');
        
        assert.strictEqual(testObj.existing, 'new');
        assert.strictEqual(testObj.newProp, 'newValue');
        done();
    });

    })