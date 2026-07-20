import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should throw an error when done is not a function', () => {
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

    expect(() => drain(() => true, 'not a function')).toThrowError();
  });
});