let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with array', function(done) {
        let original = [1, 2, { nested: 'value' }, [4, 5]];
        let copied = q.passByCopy(original);
        
        // Should be a deep copy
        assert.notStrictEqual(copied, original);
        assert.notStrictEqual(copied[2], original[2]);
        assert.notStrictEqual(copied[3], original[3]);
        
        // Should have the same values
        assert.deepEqual(copied, original);
        
        // Modifying the copy should not affect the original
        copied[2].nested = 'modified';
        copied[3].push(6);
        
        assert.equal(original[2].nested, 'value');
        assert.equal(original[3].length, 2);
        assert.equal(copied[2].nested, 'modified');
        assert.equal(copied[3].length, 3);
        
        done();
    });

    })