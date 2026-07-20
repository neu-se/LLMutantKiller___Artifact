let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.race - handles empty array', function(done) {
        let racePromise = q.Promise.race([]);
        
        // Race with empty array should never resolve or reject
        let timeout = setTimeout(() => {
            done(); // Test passes if promise never settles
        }, 50);
        
        racePromise.then(function(value) {
            clearTimeout(timeout);
            done(new Error('Should not resolve with empty array'));
        }).catch(function(error) {
            clearTimeout(timeout);
            done(new Error('Should not reject with empty array'));
        });
    });
    
    })