import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done with an error when an error occurs in the original code', () => {
    const read = jest.fn((err, cb) => {
      cb(new Error('Test error'), 'data');
    });
    const done = jest.fn();
    const sink = drain(null, done);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(new Error('Test error'));
  });
});