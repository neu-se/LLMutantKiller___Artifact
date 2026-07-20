let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with null/undefined values', function(done) {
        let tests = [null, undefined];
        let completed = 0;
        
        tests.forEach(function(testValue) {
            q.when(testValue, function(value) {
                assert.strictEqual(value, testValue);
                completed++;
                if (completed === tests.length) {
                    done();
                }
            }, function(error) {
                done(error);
            });
        });
    });

    })