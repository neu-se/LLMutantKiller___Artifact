let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick.runAfter handles empty function', function(done) {
        let task = function() {
            // Empty function should still execute
            done();
        };
        
        q.nextTick.runAfter(task);
    });
    
    })