let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.invoke with synchronous method', function(done) {
        // Create a test object with a method
        const testObj = {
            greet: function(name, greeting) {
                return greeting + ', ' + name + '!';
            }
        };

        q.invoke(testObj, 'greet', 'Alice', 'Hello')
            .then(function(result) {
                assert.equal(result, 'Hello, Alice!');
                done();
            })
            .catch(done);
    });

    })