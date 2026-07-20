import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose() with a non-object first argument', () => {
    const a = 'not an object';
    const b = { bold: true };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual(b);
  });
});