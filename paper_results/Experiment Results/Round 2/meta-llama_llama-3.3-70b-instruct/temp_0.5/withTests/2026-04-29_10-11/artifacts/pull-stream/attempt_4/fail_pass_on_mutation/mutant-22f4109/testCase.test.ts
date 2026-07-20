import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should call the done callback when no error occurs', (done) => {
    const read = () => {
      return (abort, cb) => {
        if (abort) {
          cb(abort);
        } else {
          cb(null, 1);
          cb(true);
        }
      };
    };

    const drainInstance = drain(() => true, (err) => {
      expect(err).toBeNull();
      done();
    });

    drainInstance(read());
  });
});