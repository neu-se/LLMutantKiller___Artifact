import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle sink as null correctly', () => {
    const read = () => {};
    const sink = () => {};
    const result1 = pull(read, () => {}, null);
    const result2 = pull(read, () => {}, {});
    expect(result1).toBe(result2);
  });
});