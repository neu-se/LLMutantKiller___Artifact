let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.invoke with method that returns a promise', function(done) {
        let testObject = {
            asyncMethod: function(value) {
                return q.resolve(value * 2);
            }
        };
        
        q.invoke(testObject, 'asyncMethod', 10)
            .then(function(result) {
                assert.equal(result, 20);
                done();
            })
            .catch(done);
    });
    
    })