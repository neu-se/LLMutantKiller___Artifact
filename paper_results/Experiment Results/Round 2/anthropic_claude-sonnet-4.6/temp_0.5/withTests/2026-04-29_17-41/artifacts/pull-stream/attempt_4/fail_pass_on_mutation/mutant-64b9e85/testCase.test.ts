import pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
import values = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js');
import find = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js');

describe('find sink', () => {
  it('should call callback only once with null error when item is not found in stream', (done) => {
    const calls: Array<[any, any]> = [];

    pull(
      values([1, 2, 3, 4, 5]),
      find(
        (d: number) => d === 99,
        (err: any, result: any) => {
          calls.push([err, result]);
          // Use setImmediate to allow any additional calls to accumulate
          setImmediate(() => {
            // The first (and only) call should have err=null
            // Original: err === true ? null : err => null
            // Mutated:  false ? null : err => true (passes true as error)
            expect(calls[0][0]).toBeNull();
            expect(calls[0][1]).toBeNull();
            done();
          });
        }
      )
    );
  });
});