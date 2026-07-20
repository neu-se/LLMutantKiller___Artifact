import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom function', () => {
  it('should not change the type of the input when it is not a buffer', () => {
    const content = 'Hello, World!';
    const result = stripBom(content);
    expect(Object.prototype.toString.call(result)).toBe(Object.prototype.toString.call(content));
  });
});