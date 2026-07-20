import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('simple retain compose', () => {
    const a = new Delta([{ retain: 2 }]);
    const b = new Delta([{ retain: 2 }, { delete: 1 }]);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ retain: 2 }, { delete: 1 }]);
  });
});