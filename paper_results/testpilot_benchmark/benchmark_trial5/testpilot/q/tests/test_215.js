let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.all with resolved promises', function(done) {
        let promise1 = q.resolve(10);
        let promise2 = q.resolve(20);
        
        q.fcall(function() {
            return [promise1, promise2];
        }).all().then(function(results) {
            assert.deepEqual(results, [10, 20]);
            done();
        }).catch(done);
    });

    })