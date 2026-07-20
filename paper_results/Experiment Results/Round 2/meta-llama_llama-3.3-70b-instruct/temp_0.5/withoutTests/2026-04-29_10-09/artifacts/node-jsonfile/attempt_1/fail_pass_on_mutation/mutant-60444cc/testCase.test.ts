import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe('stripBom function', () => {
  it('should not modify non-buffer content', () => {
    const originalContent = 'Hello, World!';
    const result = stripBom(originalContent);
    expect(result).toBe(originalContent);
  });
});