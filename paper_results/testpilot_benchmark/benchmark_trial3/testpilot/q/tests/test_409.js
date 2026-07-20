let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.race - works with empty array', function(done) {
        // Q.race with empty array should never resolve or reject
        let racePromise = q.race([]);
        
        let resolved = false;
        let rejected = false;
        
        racePromise.then(function(result) {
            resolved = true;
            done(new Error('Should not resolve with empty array'));
        }).catch(function(error) {
            rejected = true;
            done(new Error('Should not reject with empty array'));
        });
        
        // Give it some time and then consider it passed if nothing happens
        setTimeout(() => {
            if (!resolved && !rejected) {
                done(); // Test passes if promise never settles
            }
        }, 50);
    });
});