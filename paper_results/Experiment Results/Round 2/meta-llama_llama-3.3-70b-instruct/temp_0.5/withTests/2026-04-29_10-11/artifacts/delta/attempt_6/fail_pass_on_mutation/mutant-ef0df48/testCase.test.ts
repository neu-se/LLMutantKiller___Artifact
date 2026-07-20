import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose function should handle non-object inputs correctly', () => {
    const a = { bold: true };
    const b = { italic: true };
    expect(AttributeMap.compose(a, b)).toEqual({ bold: true, italic: true });
    expect(AttributeMap.compose(a, false)).toEqual(a);
    expect(() => {
      // @ts-ignore
      const c = false;
      // @ts-ignore
      AttributeMap.compose(a, c);
      // @ts-ignore
      AttributeMap.compose(a, 'string');
    }).not.toThrow();
  });
});