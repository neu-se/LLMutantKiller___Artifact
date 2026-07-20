import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap compose', () => {
  it('should correctly compose attribute maps', () => {
    const a = { a: 1, b: 2 };
    const b = { b: undefined, c: 3 };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ a: 1, c: 3 });
  });
});