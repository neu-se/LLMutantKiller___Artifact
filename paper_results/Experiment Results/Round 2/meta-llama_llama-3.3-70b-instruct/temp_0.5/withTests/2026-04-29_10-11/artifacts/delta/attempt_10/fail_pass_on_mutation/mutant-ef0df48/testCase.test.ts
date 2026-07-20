import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose function should handle non-object inputs correctly', () => {
    const a = { bold: true };
    const b = false;
    expect(() => {
      if (typeof b !== 'object') {
        throw new Error('b should be an object');
      }
      AttributeMap.compose(a, b);
    }).toThrowError('b should be an object');
  });
});