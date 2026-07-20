import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js'

describe('+ stripBom()', () => {
  it('should only remove BOM from start of string', () => {
    const fileContent = '\uFEFF{"key": "value"}\uFEFF';
    const result = stripBom(fileContent);
    expect(result).toContain('\uFEFF');
  });
});