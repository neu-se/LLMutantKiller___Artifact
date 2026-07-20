let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with method that returns a promise', function(done) {
        let testObject = {
            asyncMultiply: function(a, b) {
                return q.resolve(a * b);
            }
        };
        
        let promise = q.post(testObject, 'asyncMultiply', [4, 6]);
        
        promise.then(function(result) {
            assert.equal(result, 24);
            done();
        }).catch(done);
    });
    
    })