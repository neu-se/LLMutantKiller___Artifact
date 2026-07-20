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

    it('should handle deletion of multiple keys', function(done) {
        Promise.all([
            promiseObj.set('key1', 'value1'),
            promiseObj.set('key2', 'value2'),
            promiseObj.set('key3', 'value3')
        ])
        .then(() => promiseObj.delete('key2'))
        .then((result) => {
            assert.strictEqual(result, true);
            return Promise.all([
                promiseObj.get('key1'),
                promiseObj.get('key2'),
                promiseObj.get('key3')
            ]);
        })
        .then((values) => {
            assert.strictEqual(values[0], 'value1');
            assert.strictEqual(values[1], undefined);
            assert.strictEqual(values[2], 'value3');
            done();
        })
        .catch(done);
    });
});