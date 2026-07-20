import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle sink as null correctly', () => {
    const read = () => {};
    const result = pull(read, () => {}, null);
    expect(result).toBe(read);
  });
});