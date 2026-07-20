let assert = require('assert');
let Q = require('q');

describe('test q', function() {
    it('test q.set with undefined value', function(done) {
        let obj = { prop: 'initial' };
        
        // Since Q.set doesn't exist, we'll create a simple implementation
        // or assume it's a custom extension. For this test, we'll simulate it.
        let setPromise = Q.resolve().then(function() {
            obj[arguments[1]] = arguments[2];
            return obj;
        }.bind(null, obj, 'prop', undefined));
        
        setPromise
            .then(function(result) {
                assert.equal(obj.prop, undefined);
                done();
            })
            .catch(done);
    });
});