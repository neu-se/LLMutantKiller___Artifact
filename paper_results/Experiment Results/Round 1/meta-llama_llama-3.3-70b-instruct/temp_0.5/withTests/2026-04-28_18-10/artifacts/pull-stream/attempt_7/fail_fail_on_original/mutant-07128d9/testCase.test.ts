import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with error when end is an error', () => {
    const err = new Error('test error');
    const read = (end: any, cb: any) => {
      cb(end, null);
    };
    const done = jest.fn();
    const sink = drain(read, done);
    sink(err, null);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(err);
  });
});