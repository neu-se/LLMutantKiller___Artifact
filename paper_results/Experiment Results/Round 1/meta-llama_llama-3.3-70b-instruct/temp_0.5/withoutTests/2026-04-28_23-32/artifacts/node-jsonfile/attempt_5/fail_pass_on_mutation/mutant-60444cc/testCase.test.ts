import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom function', () => {
  it('should handle Buffer objects correctly', () => {
    const nonBufferContent = new String('Hello, World!');
    expect(stripBom(nonBufferContent)).toBe('Hello, World!');
    expect(typeof stripBom(nonBufferContent)).toBe('string');
  });
});