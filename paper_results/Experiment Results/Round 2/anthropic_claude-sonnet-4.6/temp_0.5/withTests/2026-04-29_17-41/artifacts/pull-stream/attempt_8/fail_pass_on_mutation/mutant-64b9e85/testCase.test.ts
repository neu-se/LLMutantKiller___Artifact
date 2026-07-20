import pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
import values = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js');
import find = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js');
import drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('find sink', () => {
  it('should pass null error when stream ends normally with no match found', (done) => {
    // Create a source that ends with true after emitting values
    const emitted: any[] = [];
    
    pull(
      values([10, 20, 30]),
      find(
        (d: number) => d === 99, // never matches
        (err: any, result: any) => {
          emitted.push({ err, result });
          // Delay to ensure no more calls come
          setTimeout(() => {
            expect(emitted.length).toBe(1);
            // Original: err===true => null; Mutated: false => err which is true
            expect(emitted[0].err).toBeNull();
            expect(emitted[0].result).toBeNull();
            done();
          }, 50);
        }
      )
    );
  });
});