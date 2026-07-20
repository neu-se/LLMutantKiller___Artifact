import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should produce empty result when b has null retain against embed retain', () => {
    const a = new Delta().retain({ image: 'url' });
    const b = new Delta([{ retain: null as any }]);
    const result = a.transform(b, false);
    expect(result.ops).toEqual([]);
  });
});