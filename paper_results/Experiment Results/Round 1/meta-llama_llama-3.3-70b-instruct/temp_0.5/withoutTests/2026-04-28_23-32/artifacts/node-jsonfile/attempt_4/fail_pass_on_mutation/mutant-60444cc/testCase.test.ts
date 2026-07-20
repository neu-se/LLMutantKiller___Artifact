import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom function', () => {
  it('should handle Buffer objects correctly', () => {
    const bufferContent = Buffer.from('\uFEFFHello, World!');
    const stringContent = 'Hello, World!';
    expect(stripBom(bufferContent)).toBe(stringContent);
    const nonBufferContent = 'Hello, World!';
    expect(typeof stripBom(nonBufferContent)).toBe('string');
    expect(stripBom(nonBufferContent)).toBe(nonBufferContent);
  });
});