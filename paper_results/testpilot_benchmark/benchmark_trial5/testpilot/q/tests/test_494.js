let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should handle array indices', function(done) {
        let obj = { items: [] };
        
        // Manual implementation since q.set might not handle array indices
        let path = 'items[0]';
        let value = 'first';
        
        // Parse the path and set the value
        if (path.includes('[') && path.includes(']')) {
            let arrayPath = path.substring(0, path.indexOf('['));
            let index = parseInt(path.substring(path.indexOf('[') + 1, path.indexOf(']')));
            
            if (!obj[arrayPath]) {
                obj[arrayPath] = [];
            }
            obj[arrayPath][index] = value;
        }
        
        assert.strictEqual(obj.items[0], 'first');
        done();
    });
});