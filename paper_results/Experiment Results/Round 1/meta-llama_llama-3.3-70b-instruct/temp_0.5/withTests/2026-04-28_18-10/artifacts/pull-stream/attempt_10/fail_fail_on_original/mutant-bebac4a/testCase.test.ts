import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/index.js'

describe('drain', () => {
  it('should call the done function when the stream is aborted', (done) => {
    const sink = pull.drain((data: any) => {
      return true;
    }, (err: any) => {
      if (err === true) {
        done();
      } else {
        done(new Error('Expected error to be true'));
      }
    });

    pull(
      pull.values([1, 2, 3]),
      sink
    );

    sink.abort();
  });
});