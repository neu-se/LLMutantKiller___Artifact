import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';
import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('drain', () => {
  it('should call done callback when end is true and done is provided', () => {
    const done = jest.fn();
    const read = jest.fn((end, cb) => {
      cb(end, null);
    });
    const sink = drain(() => {}, done);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });

  it('should not call done callback when end is true and done is not provided', () => {
    const done = jest.fn();
    const read = jest.fn((end, cb) => {
      cb(end, null);
    });
    const sink = drain(() => {}, null);
    sink(read);
    expect(done).not.toHaveBeenCalled();
  });
});