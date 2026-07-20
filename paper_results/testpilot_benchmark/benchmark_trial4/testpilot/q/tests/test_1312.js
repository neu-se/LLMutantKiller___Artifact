let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when without callbacks', function(done) {
        q.when('no callbacks').then(function(value) {
            assert.equal(value, 'no callbacks');
            done();
        }).catch(done);
    });
});