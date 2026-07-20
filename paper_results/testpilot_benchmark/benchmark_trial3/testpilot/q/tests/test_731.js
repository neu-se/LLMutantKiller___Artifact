let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke - method with string parameter', function(done) {
        let testObj = {
            greet: function(name) {
                return 'Hello, ' + name;
            }
        };
        
        let promise = q.makePromise(testObj);
        
        promise.invoke('greet', 'World')
            .then(function(result) {
                assert.equal(result, 'Hello, World');
                done();
            })
            .catch(done);
    });

    })