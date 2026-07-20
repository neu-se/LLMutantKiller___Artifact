let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

function infinite (generate) {
  generate = generate || Math.random
  return function (end, cb) {
    if(end) return cb && cb(end)
    return cb(null, generate())
  }
}

describe('test pull_stream', function() {
    it('test pull-stream.infinite with generator returning different types', function(done) {
        const generators = [
            () => 'string',
            () => ({ key: 'value' }),
            () => [1, 2, 3],
            () => true
        ];
        
        let testIndex = 0;
        
        function testNextGenerator() {
            if (testIndex >= generators.length) {
                return done();
            }
            
            const stream = infinite(generators[testIndex]);
            stream(false, (err, value) => {
                assert.strictEqual(err, null);
                
                switch(testIndex) {
                    case 0:
                        assert.strictEqual(value, 'string');
                        break;
                    case 1:
                        assert.deepStrictEqual(value, { key: 'value' });
                        break;
                    case 2:
                        assert.deepStrictEqual(value, [1, 2, 3]);
                        break;
                    case 3:
                        assert.strictEqual(value, true);
                        break;
                }
                
                testIndex++;
                testNextGenerator();
            });
        }
        
        testNextGenerator();
    });
});