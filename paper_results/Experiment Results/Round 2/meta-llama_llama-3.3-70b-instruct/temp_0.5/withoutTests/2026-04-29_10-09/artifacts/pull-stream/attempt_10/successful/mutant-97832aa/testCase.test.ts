import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle sink as null correctly', () => {
    const read = () => {};
    expect(() => pull(read, null)).not.toThrowError();
    expect(() => pull(read, {})).toThrowError();
  });
});