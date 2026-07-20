import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js'

describe('+ stripBom()', () => {
  it('should only remove BOM from start of string', () => {
    const fileContent = '\uFEFF\uFEFF{"key": "value"}';
    const result = stripBom(fileContent);
    expect(result.length).toBe(17);
  });
});