let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with non-existent method', function(done) {
        let testObject = {};
        
        let promise = q.post(testObject, 'nonExistentMethod', []);
        
        promise.then(function() {
            done(new Error('Should have thrown an error'));
        }).catch(function(error) {
            assert(error instanceof TypeError);
            done();
        });
    });
    
    })