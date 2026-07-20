import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom', () => {
  it('should not convert non-Buffer, non-string input to Buffer', () => {
    const obj = { foo: 'bar' };
    expect(() => stripBom(obj)).toThrowError(TypeError);
  });
});