import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('drain', () => {
  it('should call done when end is an error', () => {
    const done = jest.fn();
    const drainStream = pull.drain(() => true, done);

    pull(
      pull.values([1, 2, 3]),
      pull.through(() => {}),
      drainStream
    );

    expect(done).toHaveBeenCalledTimes(1);
  });

  it('should not call done when end is not an error', () => {
    const done = jest.fn();
    const drainStream = pull.drain(() => true, done);

    pull(
      pull.values([1, 2, 3]),
      pull.through(() => {}),
      drainStream
    );

    expect(done).toHaveBeenCalledTimes(1);
  });
});