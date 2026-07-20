let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with promise that throws in then', function(done) {
        let promise = q.resolve('initial').then(function() {
            throw new Error('Thrown in then');
        });
        
        q.catch(promise, function(error) {
            assert.strictEqual(error.message, 'Thrown in then');
            done();
        });
    });
    
    })