import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream';
import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('pull-stream drain', () => {
  it('should handle end correctly', () => {
    const read = pull(
      pull.values([1, 2, 3]),
      pull.map((data) => data)
    );

    const sink = drain(
      (data) => {
        // do nothing
      },
      (err) => {
        if (err) {
          throw err;
        }
      }
    );

    read(null, (end, data) => {
      if (end) {
        sink(end, () => {});
      } else {
        sink(null, (end, data) => {
          if (end) {
            sink(end, () => {});
          }
        });
      }
    });
  });
});