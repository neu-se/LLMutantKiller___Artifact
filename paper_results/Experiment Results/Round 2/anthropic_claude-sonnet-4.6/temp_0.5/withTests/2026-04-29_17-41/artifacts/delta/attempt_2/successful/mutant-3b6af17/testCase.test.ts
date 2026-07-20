import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('numeric retain against empty object retain should not throw', () => {
    const a = new Delta().retain(1);
    const b = new Delta().retain({} as Record<string, unknown>);
    // Original: typeof thisData === 'object' is false for number, so no handler lookup
    // Mutated: true && 1 !== null → enters block, Object.keys(1)[0] === Object.keys({})[0] → undefined === undefined → true → getHandler(undefined) throws
    expect(() => a.transform(b, true)).not.toThrow();
    expect(a.transform(b, true)).toEqual(new Delta().retain({}));
  });
});