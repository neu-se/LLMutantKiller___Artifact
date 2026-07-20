import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should not overwrite b values when a has undefined', () => {
    const a = { key1: undefined, key2: 'value2' };
    const b = { key1: 'keep_me', key3: 'value3' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ key1: 'keep_me', key2: 'value2', key3: 'value3' });
  });
});