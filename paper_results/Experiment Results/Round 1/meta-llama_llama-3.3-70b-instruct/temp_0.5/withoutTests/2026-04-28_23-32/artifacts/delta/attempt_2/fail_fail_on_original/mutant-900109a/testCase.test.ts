import { AttributeMap } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose function should handle non-object input correctly', () => {
    const a = { key: 'value' };
    const b = { key: 'newValue' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ key: 'newValue' });
  });
});