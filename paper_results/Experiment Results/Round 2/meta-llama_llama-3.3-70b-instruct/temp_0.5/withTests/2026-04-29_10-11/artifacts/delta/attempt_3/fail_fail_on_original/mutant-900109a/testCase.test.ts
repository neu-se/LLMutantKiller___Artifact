import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('compose function should handle non-object left attribute map', () => {
    const left: any = 'string';
    const right: any = { a: 1, b: 2 };
    const result = AttributeMap.compose(left, right);
    expect(result).toEqual({ a: 1, b: 2 });
  });
});