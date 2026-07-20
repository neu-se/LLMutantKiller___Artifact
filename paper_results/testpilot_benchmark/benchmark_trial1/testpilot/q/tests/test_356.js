let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke - multiple arguments', function(done) {
        const mockObject = {
            multiArgMethod: function(a, b, c, d, callback) {
                setTimeout(() => {
                    callback(null, a * b + c * d);
                }, 10);
            }
        };

        const promisifiedObject = q.makePromise(mockObject, function(name, args) {
            return q.Promise((resolve, reject) => {
                const callback = args[args.length - 1];
                const methodArgs = args.slice(0, -1);
                
                if (typeof this[name] === 'function') {
                    this[name].apply(this, methodArgs.concat([callback]));
                } else {
                    callback(new Error('Method not found'));
                }
            }.bind(this));
        });

        promisifiedObject.ninvoke('multiArgMethod', 2, 3, 4, 5)
            .then(result => {
                assert.strictEqual(result, 26); // 2*3 + 4*5 = 6 + 20 = 26
                done();
            })
            .catch(done);
    });
});