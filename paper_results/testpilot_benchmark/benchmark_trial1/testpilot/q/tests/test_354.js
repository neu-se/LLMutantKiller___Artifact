let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke - error callback', function(done) {
        // Create a mock object with a method that calls back with an error
        const mockObject = {
            errorMethod: function(callback) {
                setTimeout(() => {
                    callback(new Error('Test error'));
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

        promisifiedObject.ninvoke('errorMethod')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });

    