let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.race - works with empty array', function(done) {
        let answerPs = [];
        
        // Race with empty array should never resolve or reject
        let racePromise = q.Promise.race(answerPs);
        
        // Set a timeout to verify it doesn't resolve
        let timeout = setTimeout(() => {
            done(); // Test passes if promise never resolves
        }, 50);
        
        racePromise.then(() => {
            clearTimeout(timeout);
            done(new Error('Promise should not resolve with empty array'));
        }).catch(() => {
            clearTimeout(timeout);
            done(new Error('Promise should not reject with empty array'));
        });
    });
    
    })