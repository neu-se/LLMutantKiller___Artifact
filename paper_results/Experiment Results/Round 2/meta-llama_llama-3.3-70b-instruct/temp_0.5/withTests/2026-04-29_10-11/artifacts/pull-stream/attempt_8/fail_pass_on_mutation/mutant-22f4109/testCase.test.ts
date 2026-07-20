import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should not throw an error when no error occurs', (done) => {
    const read = () => {
      return (abort: any, cb: any) => {
        if (abort) {
          cb(abort);
        } else {
          cb(null, 1);
          cb(true);
        }
      };
    };

    const drainInstance = drain(() => true, () => {
      done();
    });

    drainInstance(read());
  });
});