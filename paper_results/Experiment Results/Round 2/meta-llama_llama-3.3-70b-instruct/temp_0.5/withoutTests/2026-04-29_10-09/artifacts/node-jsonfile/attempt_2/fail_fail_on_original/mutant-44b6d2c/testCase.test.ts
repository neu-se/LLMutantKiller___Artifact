import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom function', () => {
  it('should only remove BOM from the start of the string', () => {
    const bom = '\uFEFF';
    const content = 'Hello, ' + bom + 'World!';
    const expected = content;
    expect(stripBom(content)).toBe(expected);
  });
});