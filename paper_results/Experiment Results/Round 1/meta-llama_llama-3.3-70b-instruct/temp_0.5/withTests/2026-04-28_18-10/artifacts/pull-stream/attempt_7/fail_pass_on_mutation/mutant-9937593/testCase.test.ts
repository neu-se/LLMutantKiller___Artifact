import pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('drain', () => {
  it('should call done with error when end is an error', () => {
    const done = jest.fn();
    pull(
      pull.values([1, 2, 3]),
      pull.drain(() => true, done)
    );

    expect(done).toHaveBeenCalledTimes(1);
  });
});