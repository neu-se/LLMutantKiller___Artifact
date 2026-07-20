import prop from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js';

describe('prop function', () => {
  it('should return the original value when key is an object with exec function that returns null', () => {
    const data = 'hello world';
    const key = { exec: () => null };
    const result = prop(key)(data);
    expect(result).toBeNull();
  });
});