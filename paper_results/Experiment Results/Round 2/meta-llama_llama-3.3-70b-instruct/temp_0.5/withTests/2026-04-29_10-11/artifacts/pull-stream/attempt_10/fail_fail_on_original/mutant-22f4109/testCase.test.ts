import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should throw an error when done is supplied and the condition is true in the mutated code', () => {
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

    expect(() => drain(() => true, () => {})).toThrowError();
  });
});