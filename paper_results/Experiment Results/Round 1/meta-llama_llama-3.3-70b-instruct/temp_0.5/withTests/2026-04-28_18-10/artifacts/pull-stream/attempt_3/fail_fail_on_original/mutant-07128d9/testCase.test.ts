import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should not throw error when end is not true', () => {
    const done = jest.fn();
    const sink = drain(null, done);
    expect(() => sink(false, null)).not.toThrow();
  });
});