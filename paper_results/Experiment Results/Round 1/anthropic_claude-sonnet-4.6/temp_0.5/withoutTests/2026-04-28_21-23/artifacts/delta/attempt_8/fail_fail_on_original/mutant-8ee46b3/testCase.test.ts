import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('transform with insert in this and retain in other with attributes', () => {
    const a = new Delta().insert('hello');
    const b = new Delta().retain(5, { bold: true });
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: 5, attributes: { bold: true } }]);
  });
});