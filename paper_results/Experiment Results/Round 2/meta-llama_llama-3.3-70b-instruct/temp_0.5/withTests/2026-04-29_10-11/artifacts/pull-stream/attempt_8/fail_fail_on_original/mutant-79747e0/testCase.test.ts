import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('drain', () => {
  it('should call done callback when end is true and done is provided', () => {
    const done = jest.fn();
    const read = jest.fn((end, cb) => {
      cb(end, null);
    });
    const sink = pull(
      pull.values([1, 2, 3]),
      pull.drain(() => {}, done)
    );
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });
});