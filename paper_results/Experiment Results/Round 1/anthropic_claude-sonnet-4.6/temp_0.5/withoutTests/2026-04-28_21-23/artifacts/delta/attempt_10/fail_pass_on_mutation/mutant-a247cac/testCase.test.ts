import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('compose produces correct result', () => {
    const a = new Delta([{ retain: 2, attributes: { bold: true } }, { retain: 3 }]);
    const b = new Delta([{ retain: 2, attributes: { bold: true } }, { retain: 3, attributes: { italic: true } }]);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ retain: 2, attributes: { bold: true } }, { retain: 3, attributes: { italic: true } }]);
  });
});