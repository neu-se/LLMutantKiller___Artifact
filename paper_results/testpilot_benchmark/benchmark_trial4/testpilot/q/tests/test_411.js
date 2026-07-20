let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.race - works with empty array', function(done) {
        let promise = q([]);
        
        promise.race().then(function(result) {
            // Q.race with empty array should never resolve
            done(new Error('Should not resolve with empty array'));
        }).catch(function(error) {
            done(new Error('Should not reject with empty array'));
        });
        
        // Give it some time and then consider it passed if nothing happens
        setTimeout(() => done(), 50);
    });
    
    })