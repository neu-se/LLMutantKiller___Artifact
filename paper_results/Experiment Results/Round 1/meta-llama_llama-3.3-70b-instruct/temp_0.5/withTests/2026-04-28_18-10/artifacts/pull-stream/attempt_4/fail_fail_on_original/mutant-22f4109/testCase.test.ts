import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('drain', () => {
  it('should call done when done callback is supplied and no error occurs', () => {
    const spy = jest.fn();
    const sink = pull.drain(null, spy);
    pull(
      pull.values([1, 2, 3]),
      sink
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });
});