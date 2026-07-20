import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom', () => {
  it('should handle non-Buffer and non-string input correctly', () => {
    const obj = {};
    const result = stripBom(obj);
    expect(result).toBe(obj);
  });
});