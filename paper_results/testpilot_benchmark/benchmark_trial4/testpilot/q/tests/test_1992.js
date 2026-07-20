let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with promise returned from catch handler', function(done) {
        let promise = q.reject(new Error('Test error'));
        
        q.catch(promise, function(error) {
            return q.resolve('async recovery');
        }).then(function(result) {
            assert.strictEqual(result, 'async recovery');
            done();
        }).catch(done);
    });

    })