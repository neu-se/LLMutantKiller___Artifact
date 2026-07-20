import { prop } from '../../../../../../../../subject_repositories/pull-stream/util/prop.js';

describe('prop function', () => {
  it('should return the correct value when key is a regular expression', () => {
    const data = 'hello world';
    const key = /hello/;
    const result = prop(key)(data);
    expect(result).toBe('hello');
  });
});