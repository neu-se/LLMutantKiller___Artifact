import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not throw an error when done callback is supplied', () => {
    const done = jest.fn();
    const sink = drain(null, done);
    const read = jest.fn((err, cb) => {
      cb(null, null);
    });
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
  });
});