let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with method that throws error', function(done) {
        let testObj = {
            throwError: function() {
                throw new Error('test error');
            }
        };
        
        let master = q.master(testObj);
        
        master.throwError().then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });
    
    })