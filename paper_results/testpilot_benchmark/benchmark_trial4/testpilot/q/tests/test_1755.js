let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with promise-returning object', function(done) {
        let testObject = {
            post: function(name, args) {
                if (name === 'getValue') {
                    return q.resolve(args[0] * 2);
                }
                return q.reject(new Error('Unknown method'));
            }
        };
        
        q.post(testObject, 'getValue', [5])
            .then(function(result) {
                assert.equal(result, 10);
                done();
            })
            .catch(done);
    });
    
    })