let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - all arguments bound', function(done) {
        function asyncGreet(name, greeting, callback) {
            setTimeout(() => {
                callback(null, `${greeting}, ${name}!`);
            }, 10);
        }
        
        let promiseGreet = q.makePromise(asyncGreet);
        let boundGreet = promiseGreet.fbind('Alice', 'Hello');
        
        boundGreet().then(result => {
            assert.equal(result, 'Hello, Alice!');
            done();
        }).catch(done);
    });
});