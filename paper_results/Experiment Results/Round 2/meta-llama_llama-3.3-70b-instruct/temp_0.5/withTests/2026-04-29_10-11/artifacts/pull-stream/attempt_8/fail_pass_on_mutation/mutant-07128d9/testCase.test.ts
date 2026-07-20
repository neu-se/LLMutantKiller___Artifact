import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with error when end is not true', () => {
    const done = jest.fn();
    const op = () => {};
    const read = jest.fn((err, cb) => {
      cb({ foo: 'bar' });
    });
    const sink = drain(op, done);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith({ foo: 'bar' });
  });
});