import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe('stripBom function', () => {
  it('should not attempt to call toString on non-buffer and non-string values', () => {
    const originalContent = 123;
    expect(() => stripBom(originalContent)).not.toThrow();
  });
});