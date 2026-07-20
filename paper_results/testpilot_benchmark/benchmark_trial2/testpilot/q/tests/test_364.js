let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke - no arguments except method name', function(done) {
        const mockObject = {
            noArgMethod: function(callback) {
                setTimeout(() => {
                    callback(null, 'success');
                }, 10);
            }
        };

        const promisedObject = q.makePromise(mockObject, function(name, args) {
            return q.Promise((resolve, reject) => {
                const callback = args[args.length - 1];
                const methodArgs = args.slice(0, -1);
                
                if (typeof mockObject[name] === 'function') {
                    mockObject[name].apply(mockObject, methodArgs.concat([callback]));
                } else {
                    callback(new Error('Method not found'));
                }
            });
        });

        promisedObject.ninvoke('noArgMethod')
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });
});