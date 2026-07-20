import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should throw an error when done is supplied and the condition is true', () => {
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

    const drainInstance = drain(() => true, () => {});
    expect(() => drainInstance(read())).toThrowError();
  });
});