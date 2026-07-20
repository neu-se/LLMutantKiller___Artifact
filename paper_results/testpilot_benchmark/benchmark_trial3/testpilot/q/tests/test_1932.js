let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should notify progress from all promises', function(done) {
        let progressEvents = [];
        let deferred1 = q.defer();
        let deferred2 = q.defer();
        
        q.any([deferred1.promise, deferred2.promise])
            .progress(progress => {
                progressEvents.push(progress);
            })
            .then(result => {
                assert.equal(result, 'first result');
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
            deferred2.notify('progress2');
            deferred1.resolve('first result');
        }, 10);
    });
});