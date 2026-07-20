import Delta from "../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform', () => {
  it('does not throw when transforming a number retain against an empty object retain', () => {
    const a = new Delta().retain(1);
    const b = new Delta().retain({});
    // Original: typeof thisData === 'object' where thisData=1 is false, skips embed block, no error
    // Mutated: true, enters embed block, Object.keys(1)[0]===undefined===Object.keys({})[0], calls getHandler(undefined) which throws
    expect(() => {
      a.transform(b, true);
    }).not.toThrow();
  });
});