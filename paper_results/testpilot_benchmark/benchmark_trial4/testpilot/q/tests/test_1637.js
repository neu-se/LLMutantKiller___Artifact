let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.dispatch with method that takes arguments', function(done) {
        let testObject = {
            multiply: function(x, y) {
                return x * y;
            }
        };
        
        q.dispatch(testObject, 'multiply', [3, 4])
            .then(function(result) {
                assert.equal(result, 12);
                done();
            })
            .catch(done);
    });
    
    })