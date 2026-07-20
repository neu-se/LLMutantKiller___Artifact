let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch - should catch rejection from promise', function(done) {
        let rejectedPromise = q.reject(new Error('Test error'));
        
        rejectedPromise.catch(function(error) {
            assert.equal(error.message, 'Test error');
            done();
        });
    });
    
    })