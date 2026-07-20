let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter event removal', function(done) {
        let emitter = dirty();
        let called = false;
        
        function listener() {
            called = true;
        }
        
        emitter.on('test', listener);
        emitter.removeListener('test', listener);
        emitter.em    })
})