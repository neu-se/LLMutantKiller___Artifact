let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    let emitter;
    
    beforeEach(function() {
        emitter = new EventEmitter();
    });
    
    it('test dirty.Dirty.on with options object', function(done) {
        let options = { once: true, priority: 'high' };
        let result;
        
        try {
            result = dirty.Dirty.on(emitter, 'test-event-with-options', options);
            // If no error is thrown, the function accepts options
            assert.ok(true, 'Function should accept options parameter');
            done();
        } catch (error) {
            done(error);
        }
    });
    
    })