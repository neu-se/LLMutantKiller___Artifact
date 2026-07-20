import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should not throw an error when done is not supplied', () => {
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

    const drainInstance = drain(() => true);
    expect(() => drainInstance(read())).not.toThrowError();
  });
});