import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with null firstOther', () => {
  it('should handle null firstOther correctly', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(null);
    expect(() => {
      a.compose(b);
    }).toThrow();
  });
});