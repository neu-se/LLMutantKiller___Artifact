import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should not throw error when end is true and data is null', () => {
    const done = jest.fn();
    const sink = drain(() => {}, done);
    sink(true, null);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });
});