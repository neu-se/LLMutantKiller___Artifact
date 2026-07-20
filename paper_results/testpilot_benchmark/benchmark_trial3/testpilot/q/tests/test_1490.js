let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with object containing promises', function(done) {
        let promiseObject = {
            asyncAdd: function(a, b) {
                return q.resolve(a + b);
            },
            asyncDelay: function(value) {
                let deferred = q.defer();
                setTimeout(function() {
                    deferred.resolve(value);
                }, 10);
                return deferred.promise;
            }
        };
        
        try {
            let master = q.master(promiseObject);
            
            // Verify that master is created
            assert(master !== null, 'Master should not be null');
            assert(typeof master === 'object', 'Master should be an object');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })