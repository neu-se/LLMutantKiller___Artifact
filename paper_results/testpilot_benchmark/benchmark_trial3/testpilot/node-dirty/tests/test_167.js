let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test prependOnceListener with arguments', function(done) {
        let db = dirty();
        let receivedArgs = null;
        
        db.prependOnceListener('args-test', function(arg1, arg2, arg3) {
            receivedArgs = [arg1, arg2, arg3];
        });
        
        // Emit with arguments
        db.em    })
})