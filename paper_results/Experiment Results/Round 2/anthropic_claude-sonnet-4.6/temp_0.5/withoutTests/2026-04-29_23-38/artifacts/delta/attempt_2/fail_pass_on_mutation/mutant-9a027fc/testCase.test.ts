import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transform with retain and attributes', () => {
    const a = new Delta().retain(3);
    const b = new Delta().retain(3, { bold: true });
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: 3, attributes: { bold: true } }]);
  });
});