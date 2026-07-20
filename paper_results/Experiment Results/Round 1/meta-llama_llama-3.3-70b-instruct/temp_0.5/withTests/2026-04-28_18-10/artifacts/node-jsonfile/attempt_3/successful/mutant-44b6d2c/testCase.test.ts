import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom function', () => {
  it('should not remove BOM from the middle of the string', () => {
    const fileContent = '{"key": "\uFEFFvalue"}';
    const expectedContent = '{"key": "\uFEFFvalue"}';

    const result = stripBom(fileContent);
    expect(result).toBe(expectedContent);
  });
});