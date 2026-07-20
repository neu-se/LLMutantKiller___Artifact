let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall', function(done) {
        // Test 1: fcall with a function that returns a value
        let promise1 = q.resolve(function(a, b) {
            return a + b;
        });
        
        promise1.fcall(5, 3).then(function(result) {
            assert.equal(result, 8);
        }).catch(done);

        // Test 2: fcall with a function that throws an error
        let promise2 = q.resolve(function() {
            throw new Error("Test error");
        });
        
        promise2.fcall().then(function() {
            done(new Error("Should have thrown"));
        }).catch(function(error) {
            assert.equal(error.message, "Test error");
        });

        // Test 3: fcall with no arguments
        let promise3 = q.resolve(function() {
            return "no args";
        });
        
        promise3.fcall().then(function(result) {
            assert.equal(result, "no args");
        }).catch(done);

        // Test 4: fcall with multiple arguments
        let promise4 = q.resolve(function(x, y, z) {
            return x * y * z;
        });
        
        promise4.fcall(2, 3, 4).then(function(result) {
            assert.equal(result, 24);
        }).catch(done);

        // Test 5: fcall returning a promise
        let promise5 = q.resolve(function(value) {
            return q.resolve(value * 2);
        });
        
        promise5.fcall(10).then(function(result) {
            assert.equal(result, 20);
            done();
        }).catch(done);
    });

    })