import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const done = jest.fn();
    const read = jest.fn((end, cb) => {
      cb(end, null);
    });
    const sink = drain(() => true, done);
    sink(read);
    expect(read).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledTimes(1);
  });

  it('should handle error condition correctly', () => {
    const done = jest.fn();
    const read = jest.fn((end, cb) => {
      cb(new Error('Test error'), null);
    });
    const sink = drain(() => true, done);
    sink(read);
    expect(read).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledTimes(1);
  });

  it('should call done with error when end is not true and not null', () => {
    const done = jest.fn();
    const read = jest.fn((end, cb) => {
      cb(new Error('Test error'), null);
    });
    const sink = drain(() => true, done);
    sink(read);
    expect(read).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(new Error('Test error'));
  });
});