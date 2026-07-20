let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with primitive values', function(done) {
        let number = 42;
        let string = 'hello';
        let boolean = true;
        
        assert.equal(q.passByCopy(number), number);
        assert.equal(q.passByCopy(string), string);
        assert.equal(q.passByCopy(boolean), boolean);
        
        done();
    });
});