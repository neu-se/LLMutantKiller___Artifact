import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('should handle identical ops arrays correctly', () => {
    const a = new Delta([{ insert: 'test' }]);
    const b = new Delta([{ insert: 'test' }]);
    expect(a.diff(b)).toEqual(new Delta());
  });
});