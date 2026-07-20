import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with null when end is true and no error', () => {
    const read = (end: any, cb: any) => {
      cb(true, null);
    };
    const done = jest.fn();
    const sink = drain(read, done);
    sink();
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });
});