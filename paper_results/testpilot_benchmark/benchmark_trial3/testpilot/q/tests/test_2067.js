let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q with non-promise object', function(done) {
        let simpleValue = 'not a promise';
        
        // Use q.when() to handle both promises and non-promise values
        q.when(simpleValue)
            .then(function(value) {
                assert.equal(value, 'not a promise');
                done();
            })
            .catch(done);
    });
});