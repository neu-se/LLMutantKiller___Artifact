let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.allSettled with all fulfilled promises', function(done) {
        let promises = [
            q.resolve(1),
            q.resolve(2),
            q.resolve(3)
        ];
        
        q.allSettled(promises).then(function(results) {
            assert.equal(results.length, 3);
            results.forEach(function(result) {
                assert.equal(result.state, "fulfilled");
            });
            assert.equal(results[0].value, 1);
            assert.equal(results[1].value, 2);
            assert.equal(results[2].value, 3);
            done();
        }).catch(done);
    });
});