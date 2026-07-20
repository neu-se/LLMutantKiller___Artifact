let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.all with resolved promises', function(done) {
        // Create a promise that resolves to an array
        let promise = q.fcall(function() {
            return [
                q.resolve(10),
                q.resolve(20),
                q.resolve(30)
            ];
        });
        
        // Use the .all() method on the promise
        promise.all().then(function(results) {
            assert.deepEqual(results, [10, 20, 30]);
            done();
        }).catch(done);
    });
    
    })