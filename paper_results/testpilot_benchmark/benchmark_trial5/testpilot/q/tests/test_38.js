let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy returns the same object', function(done) {
        let testObject = { name: 'test', value: 42 };
        let result = q.passByCopy(testObject);
        
        assert.strictEqual(result, testObject, 'passByCopy should return the same object reference');
        done();
    });

    })