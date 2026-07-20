import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts';

describe('AttributeMap', () => {
  it('compose() should handle b not being an object', () => {
    const a = { foo: 'bar' };
    const b = 'not an object';
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual(a);
  });
});