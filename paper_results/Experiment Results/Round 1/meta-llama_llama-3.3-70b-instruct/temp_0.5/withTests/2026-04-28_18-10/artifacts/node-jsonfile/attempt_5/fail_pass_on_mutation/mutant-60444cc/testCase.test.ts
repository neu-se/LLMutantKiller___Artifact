import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom', () => {
  it('should not convert string to Buffer when not necessary', () => {
    const str = 'Hello, World!';
    const result = stripBom(str);
    expect(Buffer.isBuffer(result)).toBe(false);
  });
});