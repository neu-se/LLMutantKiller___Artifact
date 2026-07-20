let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with immediate object', function(done) {
        let obj = { name: 'John', age: 30 };
        
        q.get(obj, 'name')
            .then(function(value) {
                assert.equal(value, 'John');
                done();
            })
            .catch(done);
    });

    })