let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - no arguments bound', function(done) {
        function asyncConcat(str1, str2, callback) {
            setTimeout(() => {
                callback(null, str1 + str2);
            }, 10);
        }
        
        let promiseConcat = q.denodeify(asyncConcat);
        let boundConcat = q.fbind(promiseConcat);
        
        boundConcat('Hello', ' World').then(result => {
            assert.equal(result, 'Hello World');
            done();
        }).catch(done);
    });
});