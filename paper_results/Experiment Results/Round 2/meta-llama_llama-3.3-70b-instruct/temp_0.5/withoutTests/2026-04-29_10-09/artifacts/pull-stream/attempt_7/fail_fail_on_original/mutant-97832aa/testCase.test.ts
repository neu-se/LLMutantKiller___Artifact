import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle sink as null correctly', () => {
    const read = () => {};
    const sink = () => {};
    const result1 = pull(read, sink, null);
    const result2 = pull(read, sink, {});
    expect(result1).not.toBe(result2);
  });
});