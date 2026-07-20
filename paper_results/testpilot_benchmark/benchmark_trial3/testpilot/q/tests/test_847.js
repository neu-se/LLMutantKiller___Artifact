let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.all - preserves order of results', function(done) {
        let slowPromise = q.delay(50).then(() => 'slow');
        let fastPromise = q.delay(10).then(() => 'fast');
        let immediatePromise = q.resolve('immediate');
        
        let mainPromise = q.resolve([slowPromise, fastPromise, immediatePromise]);
        
        mainPromise.all().then(function(results) {
            assert.deepEqual(results, ['slow', 'fast', 'immediate']);
            done();
        }).catch(done);
    });
});