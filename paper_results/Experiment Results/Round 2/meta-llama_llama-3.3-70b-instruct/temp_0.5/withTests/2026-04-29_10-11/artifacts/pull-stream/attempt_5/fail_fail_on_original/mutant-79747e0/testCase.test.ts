import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('drain', () => {
  it('should call done callback when end is true and done is provided', () => {
    const done = jest.fn();
    const sink = pull.drain(() => {}, done);
    const read = jest.fn((end, cb) => {
      cb(null, null);
    });
    sink(read);
    sink(true, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });

  it('should not call done callback when end is true and done is not provided', () => {
    const done = jest.fn();
    const sink = pull.drain(() => {}, null);
    const read = jest.fn((end, cb) => {
      cb(null, null);
    });
    sink(read);
    sink(true, () => {});
    expect(done).not.toHaveBeenCalled();
  });
});