let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fcall with regular function', function(done) {
        function add(a, b) {
            return a + b;
        }
        
        q.fcall(add, 5, 3)
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
    
    })