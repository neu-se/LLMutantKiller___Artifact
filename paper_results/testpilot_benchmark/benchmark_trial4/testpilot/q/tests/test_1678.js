let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with nested object', function(done) {
        let obj = { 
            user: { 
                profile: { 
                    email: 'test@example.com' 
                } 
            } 
        };
        
        q.get(obj, 'user')
            .then(function(result) {
                assert.deepStrictEqual(result, { profile: { email: 'test@example.com' } });
                done();
            })
            .catch(done);
    });
});