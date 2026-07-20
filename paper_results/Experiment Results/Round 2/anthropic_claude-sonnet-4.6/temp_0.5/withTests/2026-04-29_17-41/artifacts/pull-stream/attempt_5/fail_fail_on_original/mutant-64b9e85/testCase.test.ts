import pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
import values = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js');
import find = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js');

describe('find sink', () => {
  it('should call callback with null error in end callback when stream ends normally after finding item', (done) => {
    const errors: any[] = [];

    pull(
      values([1, 2, 3, 4, 5]),
      find(
        (d: number) => d === 3,
        (err: any, result: any) => {
          errors.push(err);
          if (errors.length === 2) {
            // Second call comes from end callback
            // Original: err===true ? null : err => null
            // Mutated:  false ? null : err => true
            expect(errors[1]).toBeNull();
            done();
          }
        }
      )
    );
  });
});