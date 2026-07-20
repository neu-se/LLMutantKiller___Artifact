let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick executes after current execution context', function(done) {
        let order = [];
        
        order.push('start');
        
        q.nextTick(function() {
            order.push('nextTick');
            assert.deepStrictEqual(order, ['start', 'sync', 'nextTick']);
            done();
        });
        
        order.push('sync');
    });
});