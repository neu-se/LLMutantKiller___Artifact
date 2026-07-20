import * as AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('compose function should handle object left attribute map', () => {
    const left: any = { a: 1, b: 2 };
    const right: any = { c: 3, d: 4 };
    const result = AttributeMap.compose(left, right);
    expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });
});