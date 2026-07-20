let assert = require('assert');

describe('test q', function() {
    let promiseObj;
    
    beforeEach(function() {
        // Create a fresh promise object for each test
        const data = {};
        promiseObj = {
            get: function(key) {
                return Promise.resolve(data[key]);
            },
            set: function(key, value) {
                data[key] = value;
                return Promise.resolve(value);
            },
            delete: function(key) {
                if (key in data) {
                    delete data[key];
                    return Promise.resolve(true);
                }
                return Promise.resolve(false);
            },
            keys: function() {
                return Promise.resolve(Object.keys(data));
            }
        };
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