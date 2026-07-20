import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('compose optimization detection', () => {
    const a = new Delta([{ retain: 1 }, { insert: 'Z' }]);
    const b = new Delta([{ retain: 1 }, { delete: 1 }]);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ retain: 1 }, { insert: 'Z' }]);
  });
});