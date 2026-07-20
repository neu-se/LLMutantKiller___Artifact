import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('compose optimization fires with remaining thisIter ops and otherIter delete', () => {
    const a = new Delta([{ insert: 'X' }, { retain: 3 }]);
    const b = new Delta([{ retain: 1 }, { retain: 2 }, { delete: 1 }]);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'X' }]);
  });
});