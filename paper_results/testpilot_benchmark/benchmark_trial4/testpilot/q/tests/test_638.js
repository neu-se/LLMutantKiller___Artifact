let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get - should get nested property', function(done) {
        let testObj = { 
            user: { 
                profile: { 
                    email: 'test@example.com' 
                } 
            } 
        };
        let promise = q.resolve(testObj);
        
        promise.get('user').then(function(user) {
            return user.profile.email;
        }).then(function(email) {
            assert.strictEqual(email, 'test@example.com');
            done();
        }).catch(done);
    });

    })