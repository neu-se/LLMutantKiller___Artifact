import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom', () => {
  it('should handle Buffer conversion correctly', () => {
    const buffer = Buffer.from('Hello, World!');
    const result = stripBom(buffer);
    expect(typeof result).toBe('string');
    expect(Buffer.isBuffer(result)).toBe(false);
  });
});