import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should preserve separate insert ops when composing with a retain via the optimization path', () => {
    const a = new Delta([{ insert: 'A' }, { insert: 'B' }]);
    const b = new Delta().retain(2);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'A' }, { insert: 'B' }]);
  });
});