import { AttributeMap } from '../../../AttributeMap';

describe('AttributeMap', () => {
  it('compose function should handle non-object left attribute map', () => {
    const left: any = 'string';
    const right: any = { a: 1, b: 2 };
    const result = AttributeMap.compose(left, right);
    expect(result).toEqual(right);
  });
});