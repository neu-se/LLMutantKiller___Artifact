import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta transform', () => {
  it('transforms retain operations correctly with number retain', () => {
    const a = new Delta().retain(1).insert('x');
    const b = new Delta().retain(2);
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: 2 }]);
  });
});