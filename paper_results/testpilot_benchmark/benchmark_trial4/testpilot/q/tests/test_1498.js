let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with methods that throw errors', function(done) {
        let testObj = {
            throwError: function() {
                throw new Error('test error');
            },
            normalMethod: function() {
                return 'success';
            }
        };
        
        let master = q.master(testObj);
        
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
    
    })