import pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
import values = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js');
import find = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js');

describe('find sink', () => {
  it('should not call callback with truthy error after finding a match', (done) => {
    const callArgs: Array<[any, any]> = [];

    pull(
      values([1, 2, 3, 4, 5]),
      find(
        (d: number) => d === 2,
        (err: any, result: any) => {
          callArgs.push([err, result]);
          // Check after all synchronous calls complete
          setImmediate(() => {
            // Every call to cb should have null or falsy err
            for (const [e] of callArgs) {
              // Original: when drain ends with true after abort, passes null
              // Mutated: passes true
              expect(e).toBeFalsy();
            }
            done();
          });
        }
      )
    );
  });
});