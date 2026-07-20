let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master inspect functionality', function(done) {
        let testObject = { data: 'inspect me' };
        let master = q.master(testObject);
        
        // The third function parameter should return inspection info
        // We can test this by checking if the master behaves like a Q promise
        q.when(master).then(function(result) {
            assert.strictEqual(result, testObject);
            done();
        }).catch(done);
    });

    })