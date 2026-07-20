let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with nested object property', function(done) {
        let obj = { 
            user: { 
                profile: { 
                    email: 'john@example.com' 
                } 
            } 
        };
        let result = q.get(obj, 'user');
        
        result.then(function(value) {
            assert.deepStrictEqual(value, { profile: { email: 'john@example.com' } });
            done();
        }).catch(done);
    });

    })