let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - error handling', function(done) {
        function asyncDivide(a, b, callback) {
            setTimeout(() => {
                if (b === 0) {
                    callback(new Error('Division by zero'));
                } else {
                    callback(null, a / b);
                }
            }, 10);
        }
        
        let promiseDivide = q.denodeify(asyncDivide);
        let boundDivide = promiseDivide.bind(null, 10, 0);
        
        boundDivide().then(() => {
            done(new Error('Should have thrown an error'));
        }).catch(err => {
            assert.equal(err.message, 'Division by zero');
            done();
        });
    });
});