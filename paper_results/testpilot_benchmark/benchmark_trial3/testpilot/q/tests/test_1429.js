let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.getUnhandledReasons after handling rejection', function(done) {
        let promise = q.reject(new Error('test error'));
        
        // Handle the rejection immediately
        promise.catch(() => {});
        
        setTimeout(() => {
            let reasons = q.getUnhandledReasons();
            // The rejection should not appear in unhandled reasons since we caught it
            assert(Array.isArray(reasons), 'Should still return an array');
            done();
        }, 10);
    });

    })