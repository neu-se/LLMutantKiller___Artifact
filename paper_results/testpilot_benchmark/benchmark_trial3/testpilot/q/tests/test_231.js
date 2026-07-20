let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.reject with Error object', function(done) {
        let errorObj = new Error('Test error object');
        let rejectedPromise = q.Promise.reject(errorObj);
        
        rejectedPromise.catch(function(error) {
            assert.strictEqual(error, errorObj);
            assert.strictEqual(error.message, 'Test error object');
            done();
        });
    });
    
    })