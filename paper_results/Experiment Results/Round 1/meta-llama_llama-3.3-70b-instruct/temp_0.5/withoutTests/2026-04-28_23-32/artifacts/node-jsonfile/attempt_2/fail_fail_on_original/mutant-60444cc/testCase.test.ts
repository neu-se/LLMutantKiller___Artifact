import { stripBom } from '../../utils.js';

describe('stripBom function', () => {
  it('should handle Buffer objects correctly', () => {
    const bufferContent = Buffer.from('\uFEFFHello, World!');
    const stringContent = 'Hello, World!';
    expect(stripBom(bufferContent)).toBe(stringContent);
    const stringContent2 = '\uFEFFHello, World!';
    expect(stripBom(stringContent2)).toBe(stringContent);
  });
});