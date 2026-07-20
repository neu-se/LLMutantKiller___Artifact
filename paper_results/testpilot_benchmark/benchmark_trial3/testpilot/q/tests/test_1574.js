let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with generator that handles rejected promises', function(done) {
        let errorCaught = false;
        
        function* errorHandlingGenerator() {
            try {
                yield q.reject(new Error('test error'));
            } catch (e) {
                errorCaught = true;
                assert.equal(e.message, 'test error');
            }
        }
        
        q.spawn(errorHandlingGenerator);
        
        setTimeout(() => {
            assert.equal(errorCaught, true);
            done();
        }, 10);
    });
});