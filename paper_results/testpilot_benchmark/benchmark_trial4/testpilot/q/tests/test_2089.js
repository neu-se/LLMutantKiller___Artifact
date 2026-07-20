let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with fulfilled promise', function(done) {
        let promise = q.resolve('success');
        
        // q.done should not throw for fulfilled promises
        try {
            q.done(promise);
            // Give it a moment to process
            setTimeout(() => {
                done();
            }, 10);
        } catch (error) {
            done(error);
        }
    });
});