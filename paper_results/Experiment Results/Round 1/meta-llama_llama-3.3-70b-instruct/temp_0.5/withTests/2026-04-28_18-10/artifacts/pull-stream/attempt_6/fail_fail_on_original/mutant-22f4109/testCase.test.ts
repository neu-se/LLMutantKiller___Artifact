import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('drain', () => {
  it('should not throw an error when done callback is supplied', () => {
    const spy = jest.fn();
    const sink = pull.drain(() => true, spy);
    pull(
      pull.values([1, 2, 3]),
      sink
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });
});