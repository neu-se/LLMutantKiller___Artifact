import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom function', () => {
  it('should handle non-Buffer, non-String objects correctly', () => {
    const nonBufferContent = { toString: () => 'Hello, World!' };
    expect(() => stripBom(nonBufferContent)).toThrowError(TypeError);
  });
});