import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom function', () => {
  it('should not throw an error when content is a number', () => {
    const content = 123;
    expect(() => stripBom(content)).toThrow();
  });
});