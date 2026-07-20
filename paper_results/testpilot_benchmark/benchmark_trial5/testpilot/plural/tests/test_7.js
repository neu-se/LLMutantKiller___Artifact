let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.addRule with function as result', function(done) {
        // Add a rule with a function that transforms the match
        plural.addRule(/box$/, function(match) {
            return 'boxes';
        });
        
        let result = plural('box');
        assert.equal(result, 'boxes');
        
        done();
    });

    })