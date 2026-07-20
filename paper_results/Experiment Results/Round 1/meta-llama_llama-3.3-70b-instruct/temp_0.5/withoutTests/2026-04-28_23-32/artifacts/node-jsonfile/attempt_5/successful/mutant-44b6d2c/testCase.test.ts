import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom function', () => {
  it('should only remove BOM from the start of the string', () => {
    const contentWithBomAtStart = '\uFEFFHello World';
    const contentWithBomAtEnd = 'Hello World\uFEFF';
    expect(stripBom(contentWithBomAtStart)).toBe('Hello World');
    expect(stripBom(contentWithBomAtEnd)).toBe('Hello World\uFEFF');
  });
});