import pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
import values = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js');
import find = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js');

describe('find sink', () => {
  it('should pass null as first argument to callback when no matching item is found', (done) => {
    pull(
      values([1, 2, 3, 4, 5]),
      find(
        (d: number) => d === 99,
        (err: any, result: any) => {
          // Original: err===true ? null : err => null (stream ended normally with true)
          // Mutated:  false ? null : err => true
          if (err !== null && err !== undefined) {
            done(new Error(`Expected null error but got: ${err}`));
          } else {
            expect(err).toBeNull();
            done();
          }
        }
      )
    );
  });
});