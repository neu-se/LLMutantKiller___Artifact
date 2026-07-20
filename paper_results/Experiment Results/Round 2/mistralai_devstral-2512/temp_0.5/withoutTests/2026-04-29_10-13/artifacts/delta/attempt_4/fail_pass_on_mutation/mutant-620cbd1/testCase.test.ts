import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose with retain operation', () => {
  it('should handle retain operation with zero length and attributes', () => {
    const delta1 = new Delta().insert('hello');
    const delta2 = new Delta().retain(0, { bold: true });
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: 'hello' }]);
  });
});