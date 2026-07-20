import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with object retain', () => {
  it('should handle object retain correctly', () => {
    const base = new Delta().insert({ embed: 1 });
    const delta = new Delta().retain({ embed: 2 }, { bold: true });

    expect(() => {
      delta.invert(base);
    }).toThrowError('no handlers for embed type "embed"');
  });
});