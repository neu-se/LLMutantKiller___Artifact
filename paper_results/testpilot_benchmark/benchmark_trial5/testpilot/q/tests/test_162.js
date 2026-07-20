let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke - non-existent method', function(done) {
        let testObj = {
            existingMethod: function() {
                return 'exists';
            }
        };
        
        let promise = q.makePromise(testObj);
        
        promise.invoke('nonExistentMethod')
            .then(function(result) {
                done(new Error('Should have failed for non-existent method'));
            })
            .catch(function(error) {
                assert(error instanceof Error);
                done();
            });
    });

    })