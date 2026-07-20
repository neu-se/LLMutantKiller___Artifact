let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick with function that throws error', function(done) {
        // Since q.nextTick doesn't handle errors, we need to catch them at process level
        let originalHandler = process.listeners('uncaughtException');
        
        process.once('uncaughtException', function(err) {
            assert.strictEqual(err.message, 'Test error');
            done();
        });
        
        q.nextTick(function() {
            throw new Error('Test error');
        });
    });
    
    })