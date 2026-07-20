let assert = require('assert');
let q = require('q');

describe('test q', function() {
    let promiseObj;
    
    beforeEach(function() {
        // Create a fresh promise object for each test
        let deferred = q.defer();
        
        promiseObj = {
            data: {},
            get: function(key) {
                return q.resolve(this.data && this.data[key]);
            },
            set: function(key, value) {
                this.data = this.data || {};
                this.data[key] = value;
                return q.resolve(value);
            },
            delete: function(key) {
                if (this.data && key in this.data) {
                    delete this.data[key];
                    return q.resolve(true);
                }
                return q.resolve(false);
            },
            keys: function() {
                return q.resolve(this.data ? Object.keys(this.data) : []);
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