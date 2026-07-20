const prop = require('../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js');

describe('prop function behavior with object key', () => {
  it('should handle object keys correctly', () => {
    const testData = { foo: 'bar' };
    const getFoo = prop({ exec: () => ['match'] });
    expect(typeof getFoo).toBe('function');
    expect(getFoo(testData)).toBe('match');
  });
});