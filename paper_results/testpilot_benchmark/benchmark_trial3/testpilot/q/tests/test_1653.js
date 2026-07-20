let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

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

    })