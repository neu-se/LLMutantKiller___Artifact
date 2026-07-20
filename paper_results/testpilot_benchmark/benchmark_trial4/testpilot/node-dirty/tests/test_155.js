let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependListener - with arguments', function(done) {
        let db = dirty();
        
        let receivedArgs = [];
        
        db.prependListener('args-test', function(arg1, arg2) {
            receivedArgs.push(arg1, arg2);
        });
        
        db.em    })
})