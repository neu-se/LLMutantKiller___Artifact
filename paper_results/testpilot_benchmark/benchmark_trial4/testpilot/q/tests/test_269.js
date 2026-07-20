let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with nested objects', function(done) {
        let complexObj = {
            level1: {
                level2: {
                    level3: {
                        value: 'deep'
                    }
                }
            },
            array: [1, 2, { nested: true }]
        };
        
        let copied = q.passByCopy(complexObj);
        
        // Test deep equality
        assert.deepEqual(copied, complexObj);
        
        // Test that deep modifications don't affect original
        copied.level1.level2.level3.value = 'modified';
        copied.array[2].nested = false;
        
        assert.equal(complexObj.level1.level2.level3.value, 'deep');
        assert.equal(complexObj.array[2].nested, true);
        
        done();
    });
});