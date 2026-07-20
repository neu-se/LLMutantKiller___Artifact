let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with nested object operations', function(done) {
        let testObject = {
            nested: {
                deep: {
                    value: 'deeply nested'
                }
            }
        };
        
        let master = q.master(testObject);
        
        // Test nested property access
        master.get('nested').get('deep').get('value').then(function(result) {
            assert.strictEqual(result, 'deeply nested', 'should handle nested operations');
            done();
        }).catch(done);
    });
});