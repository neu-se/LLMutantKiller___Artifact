let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind - with context binding', function(done) {
        const context = { multiplier: 2 };
        
        function mockNodeFunction(value, callback) {
            setTimeout(() => {
                callback(null, value * this.multiplier);
            }, 10);
        }
        
        const boundFunc = q.nbind(mockNodeFunction, context);
        
        boundFunc(10).then(result => {
            assert.strictEqual(result, 20);
            done();
        }).catch(done);
    });
});