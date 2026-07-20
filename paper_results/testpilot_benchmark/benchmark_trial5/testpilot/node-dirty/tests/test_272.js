let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.prototype.emit - multiple arguments', function(done) {
        let db = dirty();
        let receivedArgs = [];
        
        db.on('multi-arg-event', function(...args) {
            receivedArgs = args;
            assert.equal(args.length, 3);
            assert.equal(args[0], 'arg1');
            assert.equal(args[1], 'arg2');
            assert.equal(args[2], 'arg3');
            done();
        });
        
        db.em    })
})