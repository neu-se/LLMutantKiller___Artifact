let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    let promiseObj;
    
    beforeEach(function() {
        // Create a fresh promise object for each test
        promiseObj = q.makePromise({
            get: function(key) {
                return this.data && this.data[key];
            },
            set: function(key, value) {
                this.data = this.data || {};
                this.data[key] = value;
                return value;
            },
            delete: function(key) {
                if (this.data && key in this.data) {
                    delete this.data[key];
                    return true;
                }
                return false;
            },
            keys: function() {
                return this.data ? Object.keys(this.data) : [];
            }
        });
    });

    it('should handle deletion with null or undefined keys', function(done) {
        Promise.all([
            promiseObj.delete(null),
            promiseObj.delete(undefined),
            promiseObj.delete('')
        ])
        .then((results) => {
            assert.strictEqual(results[0], false);
            assert.strictEqual(results[1], false);
            assert.strictEqual(results[2], false);
            done();
        })
        .catch(done);
    });

    })