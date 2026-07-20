let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.addRule overrides existing rules', function(done) {
        // Add a custom rule that should override default behavior
        plural.addRule(/cat$/, 'felines');
        
        let result = plural('cat');
        assert.equal(result, 'felines');
        
        done();
    });
})