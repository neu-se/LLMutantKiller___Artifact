let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.invoke with method that returns a value', function(done) {
        const testObject = {
            add: function(a, b) {
                return a + b;
            }
        };
        
        q.invoke(testObject, 'add', 5, 3)
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
    
    })