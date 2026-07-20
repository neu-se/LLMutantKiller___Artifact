let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.all - maintains order of results', function(done) {
        let slowPromise = q.delay(50).then(() => 'slow');
        let fastPromise = q.resolve('fast');
        
        q.all([slowPromise, fastPromise])
            .then(function(results) {
                assert.deepEqual(results, ['slow', 'fast']);
                done();
            })
            .catch(done);
    });
});