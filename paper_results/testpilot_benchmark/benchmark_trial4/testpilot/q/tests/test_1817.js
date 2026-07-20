let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with no arguments', function(done) {
        function noArgsFunc() {
            return 'hello world';
        }
        
        q.fapply(noArgsFunc, [])
            .then(function(result) {
                assert.equal(result, 'hello world');
                done();
            })
            .catch(done);
    });
    
    })