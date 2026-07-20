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

    it('should delete an existing key and return true', function(done) {
        promiseObj.set('testKey', 'testValue')
            .then(() => promiseObj.delete('testKey'))
            .then((result) => {
                assert.strictEqual(result, true);
                return promiseObj.get('testKey');
            })
            .then((value) => {
                assert.strictEqual(value, undefined);
                done();
            })
            .catch(done);
    });

});