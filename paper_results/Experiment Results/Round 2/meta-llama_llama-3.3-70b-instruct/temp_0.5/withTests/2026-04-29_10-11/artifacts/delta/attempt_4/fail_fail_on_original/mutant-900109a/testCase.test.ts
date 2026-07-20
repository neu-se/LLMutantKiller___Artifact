import * as AttributeMap from '../../src/AttributeMap';

describe('AttributeMap', () => {
  it('compose function should handle null left attribute map', () => {
    const left: any = null;
    const right: any = { a: 1, b: 2 };
    const result = AttributeMap.compose(left, right);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('compose function should handle undefined left attribute map', () => {
    const left: any = undefined;
    const right: any = { a: 1, b: 2 };
    const result = AttributeMap.compose(left, right);
    expect(result).toEqual({ a: 1, b: 2 });
  });
});