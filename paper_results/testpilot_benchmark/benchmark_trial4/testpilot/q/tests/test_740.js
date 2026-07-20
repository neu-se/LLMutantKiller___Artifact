let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke - basic method invocation', function(done) {
        // Create a test object with a method
        let testObj = {
            greet: function(name, greeting) {
                return greeting + ', ' + name + '!';
            }
        };
        
        // Create a promise that resolves to the test object
        let promise = q.resolve(testObj);
        
        // Use invoke to call the greet method
        promise.invoke('greet', 'World', 'Hello')
            .then(function(result) {
                assert.equal(result, 'Hello, World!');
                done();
            })
            .catch(done);
    });

    })