import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle case 2 correctly', () => {
    const read = () => {};
    const arg1 = () => {};
    const arg2 = () => {};
    const result = pull(read, arg1, arg2);
    expect(result).toBe(arg2(arg1(read)));
  });
});