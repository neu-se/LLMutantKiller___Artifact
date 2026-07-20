import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom', () => {
  it('should handle Buffer correctly when content is not a Buffer', () => {
    const str = 'Hello, World!';
    const result = stripBom(str);
    expect(result).toBe('Hello, World!');
  });
});