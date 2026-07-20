let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with nested object', function(done) {
        let obj = { 
            user: { name: 'Alice', age: 30 },
            settings: { theme: 'dark' }
        };
        
        q.get(obj, 'user').then(function(result) {
            assert.deepEqual(result, { name: 'Alice', age: 30 });
            done();
        }).catch(done);
    });
    
    })