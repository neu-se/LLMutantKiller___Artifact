import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain function', () => {
  it('should call done callback with error when end is not true', () => {
    const done = jest.fn();
    const read = jest.fn((err, cb) => {
      cb('error', null);
    });
    const sink = drain(null, done);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith('error');
  });
});