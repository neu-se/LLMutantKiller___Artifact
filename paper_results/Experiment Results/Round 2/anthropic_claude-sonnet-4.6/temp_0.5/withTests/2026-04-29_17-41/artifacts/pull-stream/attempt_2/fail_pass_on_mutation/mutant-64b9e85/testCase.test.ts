import pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
import values = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js');
import find = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js');

describe('find sink', () => {
  it('should pass null as error to callback when no item is found and stream ends normally', (done) => {
    pull(
      values([1, 2, 3, 4, 5]),
      find(
        (d: number) => d === 99,
        (err: any, result: any) => {
          // Original code: err === true ? null : err => null (stream ended normally)
          // Mutated code:  false ? null : err => true (passes the stream-end sentinel as error)
          expect(err).toBeNull();
          expect(result).toBeNull();
          done();
        }
      )
    );
  });
});