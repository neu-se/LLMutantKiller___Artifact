import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain null with delete produces empty delta', () => {
    const a = new Delta([{ retain: null as any }]);
    const b = new Delta([{ delete: 1 }]);
    expect(a.compose(b)).toEqual(new Delta());
  });
});