import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom function', () => {
  it('should not convert a non-string, non-buffer object to a string when it does not have a toString method', () => {
    const content = {};
    content.toString = undefined;
    expect(() => stripBom(content)).toThrow();
  });
});