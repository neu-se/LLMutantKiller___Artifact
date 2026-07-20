import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts';

describe('AttributeMap', () => {
  it('compose function should handle undefined left attribute map', () => {
    const left: any = undefined;
    const right: any = { a: 1, b: 2 };
    const result = AttributeMap.compose(left, right);
    expect(result).toEqual(right);
  });
});