let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with empty object and array', function(done) {
        let emptyObj = {};
        let emptyArr = [];
        
        let copiedObj = q.passByCopy(emptyObj);
        let copiedArr = q.passByCopy(emptyArr);
        
        assert.notStrictEqual(copiedObj, emptyObj);
        assert.notStrictEqual(copiedArr, emptyArr);
        assert.deepEqual(copiedObj, emptyObj);
        assert.deepEqual(copiedArr, emptyArr);
        
        done();
    });
});