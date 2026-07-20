import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom function', () => {
  it('should not convert a non-buffer, non-string object to a string', () => {
    const content = new Object('Hello, World!');
    const result = stripBom(content);
    expect(typeof result).not.toBe('string');
  });
});