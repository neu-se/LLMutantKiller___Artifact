let assert = require('assert');

// Simple promise-based object implementation
function makePromiseObject(methods) {
    const obj = {
        data: {}
    };
    
    const promiseObj = {};
    
    for (let method in methods) {
        promiseObj[method] = function(...args) {
            return Promise.resolve(methods[method].apply(obj, args));
        };
    }
    
    return promiseObj;
}

describe('test q', function() {
    let promiseObj;
    
    beforeEach(function() {
        // Create a fresh promise object for each test
        promiseObj = makePromiseObject({
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

    it('should maintain other keys when deleting one key', function(done) {
        Promise.all([
            promiseObj.set('keepThis', 'important'),
            promiseObj.set('deleteThis', 'unimportant')
        ])
        .then(() => promiseObj.delete('deleteThis'))
        .then(() => promiseObj.keys())
        .then((keys) => {
            assert.deepStrictEqual(keys, ['keepThis']);
            return promiseObj.get('keepThis');
        })
        .then((value) => {
            assert.strictEqual(value, 'important');
            done();
        })
        .catch(done);
    });
});