let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with no pre-bound arguments', function(done) {
        function subtract(a, b) {
            return a - b;
        }
        
        let boundSubtract = q.fbind(subtract);
        let result = boundSubtract(10, 3);
        
        q.when(result).then(function(value) {
            assert.equal(value, 7);
            done();
        }).catch(done);
    });
    
    })