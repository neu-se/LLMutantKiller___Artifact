import prop from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js';

describe('prop function', () => {
  it('should return a function that returns the matched value when key is a RegExp and the condition is met', () => {
    const key = /a/;
    const data = 'abc';
    const result = prop(key)(data);
    expect(result).toBe('a');
  });
});