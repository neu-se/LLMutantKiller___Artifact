let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.addRule with regex and function', function(done) {
        // Add a rule that converts words ending with 'p' by appending 'ius'
        plural.addRule(/p{1,2}$/i, function(w) { return w + 'ius' });
        
        // Test the rule works
        let result = plural('stop');
        assert.strictEqual(result, 'stopius');
        
        done();
    });
    
    })