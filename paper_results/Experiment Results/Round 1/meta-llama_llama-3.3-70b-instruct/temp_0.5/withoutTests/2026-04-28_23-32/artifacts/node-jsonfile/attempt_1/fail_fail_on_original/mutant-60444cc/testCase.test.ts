import { stripBom } from '../../../utils.js';

describe('stripBom function', () => {
  it('should handle Buffer objects correctly', () => {
    const bufferContent = Buffer.from('Hello, World!');
    const stringContent = 'Hello, World!';
    expect(stripBom(bufferContent)).toBe(stringContent);
    expect(stripBom(stringContent)).toBe(stringContent);
  });
});