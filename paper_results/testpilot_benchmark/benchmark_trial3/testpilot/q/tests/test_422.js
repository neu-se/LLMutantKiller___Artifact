let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test toString on different promise instances', function(done) {
        // Test 5: Different promise instances should have similar toString format
        let promise1 = q.defer().promise;
        let promise2 = q.defer().promise;
        
        let toString1 = promise1.toString();
        let toString2 = promise2.toString();
        
        assert(typeof toString1 === 'string', 'First promise toString should return string');
        assert(typeof toString2 === 'string', 'Second promise toString should return string');
        
        // Both should follow similar format (though content may differ)
        assert(toString1.length > 0, 'First promise toString should not be empty');
        assert(toString2.length > 0, 'Second promise toString should not be empty');
        
        done();
    });
});