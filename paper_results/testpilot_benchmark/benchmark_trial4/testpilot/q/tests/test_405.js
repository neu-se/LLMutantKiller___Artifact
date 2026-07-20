let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.race - handles empty array', function(done) {
        q.race([]).then(function(result) {
            // Should never resolve with empty array
            done(new Error('Should not resolve with empty array'));
        }).catch(function(error) {
            done(new Error('Should not reject with empty array'));
        });
        
        // Give it some time, then assume it's working correctly (never settling)
        setTimeout(() => done(), 50);
    });
    
    })