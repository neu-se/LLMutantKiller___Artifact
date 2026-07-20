let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with arrays', function(done) {
        let testArray = [1, 2, 3, 'test'];
        let result = q.passByCopy(testArray);
        
        assert.strictEqual(result, testArray, 'should return the same array reference');
        assert.deepEqual(result, [1, 2, 3, 'test'], 'array contents should remain unchanged');
        done();
    });

    })