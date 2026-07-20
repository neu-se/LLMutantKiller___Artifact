let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with empty arguments array', function(done) {
        function noArgs() {
            return 'no arguments';
        }
        
        q.fapply(noArgs, [])
            .then(function(result) {
                assert.equal(result, 'no arguments');
                done();
            })
            .catch(done);
    });
    
    })