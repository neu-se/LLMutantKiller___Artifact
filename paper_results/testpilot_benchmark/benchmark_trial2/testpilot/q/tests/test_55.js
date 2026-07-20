let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with async descriptor', function(done) {
        let descriptor = {
            fargs: function(delay, value) {
                return [delay, value];
            },
            fcall: function(args) {
                let deferred = q.defer();
                setTimeout(function() {
                    deferred.resolve('async result: ' + args[1]);
                }, args[0]);
                return deferred.promise;
            }
        };
        
        let promiseFunc = q.makePromise(descriptor);
        
        promiseFunc(10, 'hello')
            .then(function(result) {
                assert.equal(result, 'async result: hello');
                done();
            })
            .catch(done);
    });

    })