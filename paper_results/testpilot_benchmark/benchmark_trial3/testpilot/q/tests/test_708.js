let assert = require('assert');

describe('test q', function() {
    let promiseObj;
    
    beforeEach(function() {
        // Create a fresh promise object for each test
        promiseObj = {
            data: {},
            get: function(key) {
                return Promise.resolve(this.data && this.data[key]);
            },
            set: function(key, value) {
                this.data = this.data || {};
                this.data[key] = value;
                return Promise.resolve(value);
            },
            delete: function(key) {
                if (this.data && key in this.data) {
                    delete this.data[key];
                    return Promise.resolve(true);
                }
                return Promise.resolve(false);
            },
            keys: function() {
                return Promise.resolve(this.data ? Object.keys(this.data) : []);
            }
        };
    });

    it('should return false when deleting a non-existent key', function(done) {
        promiseObj.delete('nonExistentKey')
            .then((result) => {
                assert.strictEqual(result, false);
                done();
            })
            .catch(done);
    });
});