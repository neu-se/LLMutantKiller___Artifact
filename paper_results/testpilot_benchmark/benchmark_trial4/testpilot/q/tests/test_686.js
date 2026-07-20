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

    it('should return false when deleting a non-existent key', function(done) {
        promiseObj.delete('nonExistentKey')
            .then((result) => {
                assert.strictEqual(result, false);
                done();
            })
            .catch(done);
    });

    })