import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pull = require('../');

describe('count source behavior at max boundary', () => {
  it('should emit exactly max values when max is finite', (done) => {
    pull(
      pull.count(3),
      pull.collect((err, results) => {
        expect(err).toBeNull();
        expect(results).toEqual([0, 1, 2]);
        done();
      })
    );
  });
});