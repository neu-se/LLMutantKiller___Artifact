let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delete - should handle nested object without affecting structure', function(done) {
        let testObj = { 
            user: { name: 'Bob', age: 40 }, 
            settings: { theme: 'dark' },
            temp: 'delete me'
        };
        q.delete(testObj, 'temp');
        
        assert.strictEqual(testObj.hasOwnProperty('temp'), false);
        assert.deepStrictEqual(testObj.user, { name: 'Bob', age: 40 });
        assert.deepStrictEqual(testObj.settings, { theme: 'dark' });
        done();
    });
});