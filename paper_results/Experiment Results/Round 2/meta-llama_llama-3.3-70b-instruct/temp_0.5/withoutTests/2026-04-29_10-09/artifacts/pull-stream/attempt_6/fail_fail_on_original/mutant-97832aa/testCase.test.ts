import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle sink as null correctly', () => {
    const read = () => {};
    const sink = () => {};
    const result = pull(read, sink, null);
    expect(result).toBe(sink);
  });
});