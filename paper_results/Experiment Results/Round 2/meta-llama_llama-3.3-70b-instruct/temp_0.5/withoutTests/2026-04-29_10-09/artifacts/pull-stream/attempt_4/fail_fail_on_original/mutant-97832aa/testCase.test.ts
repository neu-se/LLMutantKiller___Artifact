import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle sink as null correctly', () => {
    const read = () => {};
    const sink = () => {};
    expect(() => pull(read, sink, null)).toThrowError();
  });
});