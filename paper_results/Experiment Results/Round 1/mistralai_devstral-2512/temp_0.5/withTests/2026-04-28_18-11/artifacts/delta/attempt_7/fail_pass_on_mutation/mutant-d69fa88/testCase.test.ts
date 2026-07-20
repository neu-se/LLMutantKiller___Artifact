import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with object retain', () => {
  it('should handle object retain correctly', () => {
    const base = new Delta().insert('test');
    const delta = new Delta().retain({ embed: 1 }, { bold: true });

    expect(() => {
      delta.invert(base);
    }).toThrowError('cannot retain a string');
  });
});