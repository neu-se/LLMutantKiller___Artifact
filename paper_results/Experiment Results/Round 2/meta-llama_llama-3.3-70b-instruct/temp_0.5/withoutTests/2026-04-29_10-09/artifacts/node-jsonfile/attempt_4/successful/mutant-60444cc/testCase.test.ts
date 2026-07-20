import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe('stripBom function', () => {
  it('should not call toString on non-buffer and non-string values', () => {
    const originalContent = 123;
    expect(() => {
      const result = stripBom(originalContent);
      expect(result).toBe(originalContent.toString());
    }).toThrowError(TypeError);
  });
});