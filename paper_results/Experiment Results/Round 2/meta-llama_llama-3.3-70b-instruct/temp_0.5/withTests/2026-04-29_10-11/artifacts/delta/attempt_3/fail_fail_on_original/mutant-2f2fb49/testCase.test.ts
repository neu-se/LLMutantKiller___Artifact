import { AttributeMap } from '../../../AttributeMap';

describe('AttributeMap', () => {
  it('compose() should handle b not being an object', () => {
    const a = { foo: 'bar' };
    const b = null;
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual(a);
  });
});