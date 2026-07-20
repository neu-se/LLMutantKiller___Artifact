let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind with additional arguments', function(done) {
        function nodeStyleFunction(prefix, value, suffix, callback) {
            setTimeout(() => {
                callback(null, prefix + value + suffix);
            }, 10);
        }
        
        // Bind with pre-filled arguments
        const boundFunction = q.nbind(nodeStyleFunction, null, 'Hello ', 'World');
        
        boundFunction(' Beautiful ')
            .then(result => {
                assert.equal(result, 'Hello  Beautiful World');
                done();
            })
            .catch(done);
    });
    
    })