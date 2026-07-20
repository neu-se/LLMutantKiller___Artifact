import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should handle numeric retain values correctly', () => {
    const a = new Delta().retain(5);
    const b = new Delta().retain(3);
    const result = a.transform(b, true);
    expect(result.ops).toEqual([{ retain: 3 }, { retain: 2 }]);
  });
});