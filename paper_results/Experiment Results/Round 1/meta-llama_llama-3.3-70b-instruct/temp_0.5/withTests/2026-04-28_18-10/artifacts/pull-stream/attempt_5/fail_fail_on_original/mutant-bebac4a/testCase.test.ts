import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should call the done function when the stream is aborted', (done) => {
    const read = drain((data: any) => {
      return true;
    }, (err: any) => {
      if (err === true) {
        done();
      } else {
        done.fail('Expected error to be true');
      }
    });

    read(true, () => {
      // do nothing
    });
  });
});