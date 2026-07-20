import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose with retain operation', () => {
  it('should correctly handle retain operation with attributes in compose', () => {
    const delta1 = new Delta().insert('test');
    const delta2 = new Delta().retain(3, { bold: true });

    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ retain: 3, attributes: { bold: true } }]);
  });
});