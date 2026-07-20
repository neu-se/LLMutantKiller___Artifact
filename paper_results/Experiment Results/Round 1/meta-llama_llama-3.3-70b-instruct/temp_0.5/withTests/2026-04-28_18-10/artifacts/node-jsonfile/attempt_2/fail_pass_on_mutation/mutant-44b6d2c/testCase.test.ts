import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom function', () => {
  it('should only remove BOM from the beginning of the string', () => {
    const fileContent = '\uFEFF{"key": "\uFEFFvalue"}';
    const expectedContent = '{"key": "\uFEFFvalue"}';

    const result = stripBom(fileContent);
    expect(result).toBe(expectedContent);
  });
});