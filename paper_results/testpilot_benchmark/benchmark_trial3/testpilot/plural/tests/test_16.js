let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.addRule with complex pattern', function(done) {
        // Add a rule for words ending in 'f' or 'fe' -> 'ves'
        // Capture the part before 'f' or 'fe' and replace with captured group + 'ves'
        plural.addRule(/(.+)f(e)?$/, '$1ves');
        
        // Test both patterns
        let result1 = plural('leaf');
        let result2 = plural('knife');
        assert.equal(result1, 'leaves');
        assert.equal(result2, 'knives');
        
        done();
    });
});