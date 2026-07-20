import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.invert()', () => {
  it('should only add keys to result when attr[key] differs from base[key]', () => {
    const attributes = { key1: 'value1', key2: 'value2' };
    const base = { key1: 'value1', key2: 'different' };
    const result = AttributeMap.invert(attributes, base);
    expect(result).toEqual({ key2: 'different' });
  });
});