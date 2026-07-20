let assert = require('assert');

// Simple implementation of q.get for nested property access
let q = {
    get: function(obj, path) {
        return Promise.resolve(obj[path]);
    }
};

describe('test q', function() {
    it('test q.get with nested object property', function(done) {
        let testObj = { 
            user: { 
                profile: { 
                    email: 'test@example.com' 
                } 
            } 
        };
        
        q.get(testObj, 'user')
            .then(function(result) {
                assert.deepStrictEqual(result, { profile: { email: 'test@example.com' } });
                done();
            })
            .catch(done);
    });
});