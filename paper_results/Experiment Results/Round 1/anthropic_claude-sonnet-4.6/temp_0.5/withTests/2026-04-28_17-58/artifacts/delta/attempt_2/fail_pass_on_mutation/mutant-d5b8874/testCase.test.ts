import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain null with delete should not push delete op', () => {
    const a = new Delta([{ retain: null as any }]);
    const b = new Delta([{ delete: 1 }]);
    const expected = new Delta();
    expect(a.compose(b)).toEqual(expected);
  });
});