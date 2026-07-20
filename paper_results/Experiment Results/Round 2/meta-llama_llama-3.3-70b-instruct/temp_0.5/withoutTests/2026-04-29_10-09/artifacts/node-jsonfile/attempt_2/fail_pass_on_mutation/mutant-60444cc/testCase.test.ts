import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe('stripBom function', () => {
  it('should handle Buffer input correctly', () => {
    const originalContent = Buffer.from('Hello, World!');
    const result = stripBom(originalContent);
    expect(typeof result).toBe('string');
    expect(result).toBe('Hello, World!');
  });
});