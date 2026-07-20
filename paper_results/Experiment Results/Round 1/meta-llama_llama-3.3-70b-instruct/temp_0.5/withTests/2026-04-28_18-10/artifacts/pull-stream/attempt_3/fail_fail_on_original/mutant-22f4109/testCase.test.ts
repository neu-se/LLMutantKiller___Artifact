import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('drain', () => {
  it('should call done with error when done callback is supplied and if condition is false', () => {
    const spy = jest.fn();
    const sink = pull.drain(() => false, spy);
    pull(
      pull.values([1, 2, 3]),
      sink
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });
});