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

    })