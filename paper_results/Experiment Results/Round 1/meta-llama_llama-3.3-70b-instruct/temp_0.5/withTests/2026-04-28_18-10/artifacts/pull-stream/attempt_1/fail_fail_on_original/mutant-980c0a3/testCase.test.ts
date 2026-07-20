import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream';
import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain';

describe('pull-stream drain', () => {
  it('should handle error correctly', (done) => {
    const read = pull(
      pull.values([1, 2, 3, null, 4, 5, 6]),
      pull.map((data) => {
        if (data === null) {
          throw new Error('Test error');
        }
        return data;
      })
    );

    const sink = drain(
      (data) => {
        // do nothing
      },
      (err) => {
        if (err) {
          done();
        } else {
          done(new Error('Expected an error'));
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