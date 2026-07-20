import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('compose optimization fires with attributed retain followed by insert and delete', () => {
    const a = new Delta([{ retain: 2, attributes: { bold: true } }, { insert: 'X' }]);
    const b = new Delta([{ retain: 2, attributes: { bold: true } }, { delete: 1 }]);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ retain: 2, attributes: { bold: true } }, { insert: 'X' }]);
  });
});