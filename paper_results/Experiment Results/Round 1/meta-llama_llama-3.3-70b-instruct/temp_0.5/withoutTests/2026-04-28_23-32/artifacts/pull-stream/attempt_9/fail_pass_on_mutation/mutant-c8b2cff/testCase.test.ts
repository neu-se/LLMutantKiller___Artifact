import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should pass when the original code is used and fail when the mutated code is used', () => {
    const op = (data: any) => false;
    const done = jest.fn();

    const read = jest.fn((err: any, cb: (end: any, data: any) => void) => {
      if (err === true) {
        cb(true, null);
      } else {
        cb(null, 'data');
      }
    });

    const sink = drain(op, done);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(true, null);
    expect(read).toHaveBeenCalledTimes(2);
    expect(read.mock.calls[1][0]).toBe(true);
  });
});