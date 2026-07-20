import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom', () => {
  it('should not convert string to Buffer unnecessarily', () => {
    const str = 'Hello, World!';
    const result = stripBom(str);
    expect(Buffer.isBuffer(result)).toBe(false);
    expect(result.toString()).toBe(str);
  });
});