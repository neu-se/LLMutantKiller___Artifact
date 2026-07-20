let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.all with progress notifications', function(done) {
        let deferred1 = q.defer();
        let deferred2 = q.defer();
        let progressEvents = [];
        
        q.Promise.all([deferred1.promise, deferred2.promise])
            .progress(function(progress) {
                progressEvents.push(progress);
            })
            .then(function(results) {
                assert.deepEqual(results, ['value1', 'value2']);
                assert.equal(progressEvents.length, 2);
                assert.equal(progressEvents[0].index, 0);
                assert.equal(progressEvents[0].value, 'progress1');
                assert.equal(progressEvents[1].index, 1);
                assert.equal(progressEvents[1].value, 'progress2');
                done();
            })
            .catch(done);
        
        setTimeout(() => {
            deferred1.notify('progress1');
            deferred1.resolve('value1');
        }, 10);
        
        setTimeout(() => {
            deferred2.notify('progress2');
            deferred2.resolve('value2');
        }, 20);
    });
});