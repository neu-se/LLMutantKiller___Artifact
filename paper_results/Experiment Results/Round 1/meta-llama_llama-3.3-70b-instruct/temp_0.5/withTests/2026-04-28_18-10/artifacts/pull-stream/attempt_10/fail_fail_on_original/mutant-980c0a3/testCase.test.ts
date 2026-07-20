import pull from '../../../../../../../../../../../subject_repositories/pull-stream';
import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('pull-stream drain', () => {
  it('should handle end correctly', (done) => {
    const source = pull.values([1, 2, 3, null, 4, 5, 6]);
    const sink = drain(
      (data: any) => {
        if (data === null) {
          throw new Error('Test error');
        }
      },
      (err: any) => {
        if (err && err.message === 'Test error') {
          done();
        } else {
          done.fail('Expected an error');
        }
      }
    );

    pull(
      source,
      sink
    );
  });
});