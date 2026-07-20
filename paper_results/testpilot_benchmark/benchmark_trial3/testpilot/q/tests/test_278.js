let assert = require('assert');

// Simple deep copy implementation
function passByCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    if (Array.isArray(obj)) {
        return obj.map(item => passByCopy(item));
    }
    
    const copy = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = passByCopy(obj[key]);
        }
    }
    return copy;
}

// Create a mock q object with passByCopy method
let q = {
    passByCopy: passByCopy
};

describe('test q', function() {
    it('test q.passByCopy with nested object', function(done) {
        let original = {
            user: {
                name: 'John',
                details: {
                    age: 30,
                    city: 'New York'
                }
            },
            items: [1, 2, 3]
        };
        
        let copied = q.passByCopy(original);
        
        // Should be a deep copy
        assert.notStrictEqual(copied, original);
        assert.notStrictEqual(copied.user, original.user);
        assert.notStrictEqual(copied.user.details, original.user.details);
        assert.notStrictEqual(copied.items, original.items);
        
        // Should have the same structure and values
        assert.deepEqual(copied, original);
        
        // Modifying nested properties should not affect original
        copied.user.details.age = 31;
        copied.items.push(4);
        
        assert.equal(original.user.details.age, 30);
        assert.equal(original.items.length, 3);
        assert.equal(copied.user.details.age, 31);
        assert.equal(copied.items.length, 4);
        
        done();
    });
});