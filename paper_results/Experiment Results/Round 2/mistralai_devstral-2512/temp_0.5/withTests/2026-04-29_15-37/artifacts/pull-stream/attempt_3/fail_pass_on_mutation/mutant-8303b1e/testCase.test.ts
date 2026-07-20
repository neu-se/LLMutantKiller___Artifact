const prop = require('../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js');

describe('prop function behavior with object key', () => {
  it('should return a function that extracts values using object key', () => {
    const testData = { foo: 'bar' };
    const getFoo = prop('foo');
    expect(getFoo(testData)).toBe('bar');
  });
});