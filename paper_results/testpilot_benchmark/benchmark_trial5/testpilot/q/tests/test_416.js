let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q with methods that throw errors', function(done) {
        let testObj = {
            throwError: function() {
                throw new Error('test error');
            },
            normalMethod: function() {
                return 'success';
            }
        };
        
        // Create a wrapper that converts methods to promises
        let master = {};
        Object.keys(testObj).forEach(function(key) {
            if (typeof testObj[key] === 'function') {
                master[key] = function() {
                    return q.fcall(testObj[key].bind(testObj));
                };
            }
        });
        
        master.throwError().then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'test error');
            
            return master.normalMethod();
        }).then(function(value) {
            assert.equal(value, 'success');
            done();
        }).catch(done);
    });
});