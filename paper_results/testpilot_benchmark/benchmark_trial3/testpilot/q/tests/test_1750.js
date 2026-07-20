let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with synchronous return value', function(done) {
        let syncObject = {
            post: function(name, args) {
                return 'sync result';
            }
        };
        
        q.post(syncObject, 'syncMethod', ['test'])
            .then(function(result) {
                assert.equal(result, 'sync result');
                done();
            })
            .catch(done);
    });
    
    })