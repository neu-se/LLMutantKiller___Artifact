let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - with context binding', function(done) {
        // Create an object with a method that uses 'this'
        const obj = {
            multiplier: 3,
            multiply: function(value, callback) {
                setTimeout(() => {
                    callback(null, value * this.multiplier);
                }, 10);
            }
        };

        const promise = q.makePromise(() => {});
        const denodeified = promise.denodeify(obj.multiply, obj);
        
        denodeified(4).then(result => {
            assert.strictEqual(result, 12);
            done();
        }).catch(done);
    });

    })