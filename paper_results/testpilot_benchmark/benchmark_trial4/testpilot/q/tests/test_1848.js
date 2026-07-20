let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fcall with multiple arguments', function(done) {
        function concatenate(str1, str2, str3) {
            return str1 + str2 + str3;
        }
        
        q.fcall(concatenate, 'Hello', ' ', 'World')
            .then(function(result) {
                assert.equal(result, 'Hello World');
                done();
            })
            .catch(done);
    });
    
    })