describe('prop function', () => {
  it('should return undefined when key is a regular expression and no match is found', () => {
    const prop = require('../../../../../../../subject_repositories/pull-stream/util/prop.js');
    const data = 'foo bar';
    const key = /hello/;
    const result = prop(key)(data);
    expect(result).toBeUndefined();
  });
});