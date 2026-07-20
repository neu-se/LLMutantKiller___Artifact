import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should pass when the original code is used and fail when the mutated code is used', () => {
    const op = (data: any) => false;
    const done = jest.fn();

    const read = (err: any, cb: (end: any, data: any) => void) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, 'data');
      }
    };

    const sink = drain(op, done);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });
});