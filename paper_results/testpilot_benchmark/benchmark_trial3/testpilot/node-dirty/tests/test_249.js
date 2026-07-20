let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.prototype.emit - event with arguments', function(done) {
        let db = dirty();
        let receivedArgs = [];
        
        db.on('test-event-args', function(arg1, arg2, arg3) {
            receivedArgs = [arg1, arg2, arg3];
        });
        
        db.em    })
})