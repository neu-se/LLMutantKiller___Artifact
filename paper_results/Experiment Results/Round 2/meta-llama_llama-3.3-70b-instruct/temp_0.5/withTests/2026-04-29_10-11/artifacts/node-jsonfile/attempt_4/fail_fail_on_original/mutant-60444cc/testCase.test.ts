import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom function', () => {
  it('should not convert string to utf8 when content is a string', () => {
    const content = new String('Hello, World!');
    const result = stripBom(content);
    expect(result).toBe(content);
  });
});