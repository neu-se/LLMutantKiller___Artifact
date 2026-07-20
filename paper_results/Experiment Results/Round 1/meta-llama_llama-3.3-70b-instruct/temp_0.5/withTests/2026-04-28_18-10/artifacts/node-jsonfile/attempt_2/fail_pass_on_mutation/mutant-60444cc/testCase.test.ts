import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom', () => {
  it('should handle string correctly', () => {
    const str = '\uFEFFHello, World!';
    const result = stripBom(str);
    expect(result).toBe('Hello, World!');
  });
});