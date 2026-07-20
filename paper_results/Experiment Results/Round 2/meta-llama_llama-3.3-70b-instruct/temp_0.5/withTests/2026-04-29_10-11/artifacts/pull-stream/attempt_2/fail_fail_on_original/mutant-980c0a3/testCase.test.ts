import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with null when end is true', () => {
    const done = jest.fn();
    const end = true;
    const sink = drain(() => {}, done);
    sink(end, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });
});