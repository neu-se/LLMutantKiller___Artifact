import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with empty object retain against number retain', () => {
  it('transforms empty object retain against number retain without error', () => {
    // thisData = {} (empty object), otherData = 1 (number)
    // Original: typeof {} === 'object' && {} !== null && typeof 1 === 'object' -> false -> skip handler
    // Mutated: (typeof {} === 'object' && {} !== null) || (typeof 1 === 'object' && ...) 
    //          -> true || false -> true -> enters block
    //          embedType = Object.keys({})[0] = undefined
    //          Object.keys(1)[0] = undefined
    //          undefined === undefined -> TRUE -> calls getHandler(undefined) -> THROWS!
    const a = new Delta([{ retain: {} as Record<string, unknown> }]);
    const b = new Delta().retain(1);
    const expected = new Delta();
    const result = a.transform(b, true);
    expect(result).toEqual(expected);
  });
});