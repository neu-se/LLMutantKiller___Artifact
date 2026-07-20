import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom function', () => {
  it('should handle Buffer objects correctly', () => {
    const bufferContent = Buffer.from('Hello, World!');
    const stringContent = bufferContent.toString('utf8');
    expect(typeof stripBom(bufferContent)).toBe('string');
    expect(typeof stripBom(stringContent)).toBe('string');
    expect(stripBom(bufferContent)).toBe(stringContent);
    expect(stripBom(stringContent)).toBe(stringContent);
  });
});