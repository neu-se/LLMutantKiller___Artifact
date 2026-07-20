import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should handle regex rules correctly', () => {
    const result = plural('nucleus', 2);
    expect(result).toBe('nuclei');
  });
});