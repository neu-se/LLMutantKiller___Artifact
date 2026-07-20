let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.dispatch - method that throws error', function(done) {
        let testObject = {
            throwError: function() {
                throw new Error('Test error');
            }
        };
        
        let promise = q.makePromise(testObject);
        let result = promise.dispatch('throwError', []);
        
        result.then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'Test error');
            done();
        });
    });

    })