import Delta from "../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform', () => {
  it('transform number retain against empty object retain does not throw', () => {
    // thisData = 1 (number), otherData = {} (object with no keys)
    // Original: typeof 1 === 'object' is false → skip embed handler block → no error
    // Mutated: true → enter block → Object.keys(1)[0] === undefined === Object.keys({})[0] → getHandler(undefined) throws
    const a = new Delta().retain(1);
    const b = new Delta().retain({});
    expect(() => {
      a.transform(b, true);
    }).not.toThrow();
  });
});