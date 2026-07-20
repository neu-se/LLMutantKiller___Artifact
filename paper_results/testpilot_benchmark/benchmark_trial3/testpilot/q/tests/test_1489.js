let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with empty object', function(done) {
        let emptyObject = {};
        
        try {
            let master = q.master(emptyObject);
            
            // Verify that master is created even with empty object
            assert(master !== null, 'Master should not be null');
            assert(typeof master === 'object', 'Master should be an object');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })