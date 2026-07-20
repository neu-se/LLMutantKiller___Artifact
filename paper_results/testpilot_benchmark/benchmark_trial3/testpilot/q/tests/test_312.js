let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.all with multiple values', function(done) {
        q.all([
            q.resolve(1),
            q.resolve(2), 
            q.resolve(3)
        ]).then(function(values) {
            let result = values[0] + values[1] + values[2];
            assert.equal(result, 6);
            done();
        }).catch(done);
    });
});