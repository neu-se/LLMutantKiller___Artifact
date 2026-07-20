import { stripBom } from '../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js';

describe('stripBom function', () => {
  it('should not convert a string object to a primitive string', () => {
    const content = new String('Hello, World!');
    const result = stripBom(content);
    expect(Object.prototype.toString.call(result)).toBe(Object.prototype.toString.call(content));
  });
});