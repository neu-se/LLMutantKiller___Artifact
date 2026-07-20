import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform embed retain against embed retain with same type uses handler', () => {
    let handlerCalled = false;
    let handlerResult: unknown = null;

    Delta.registerEmbed<unknown>('myembed', {
      compose: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, _b: unknown, _priority: boolean) => {
        handlerCalled = true;
        handlerResult = { transformed: true };
        return handlerResult;
      },
      invert: (_a: unknown, b: unknown) => b,
    });

    try {
      // Both thisData and otherData are object embeds with same key 'myembed'
      // Original: true && true && true && true => enter, call handler
      // Mutated: true (short-circuit) => enter, call handler
      // Both call handler - same behavior
      // BUT: what if we test with thisData=object, otherData=number?
      // The handler should NOT be called in either case.
      // If mutated incorrectly calls handler, the result would differ.
      
      // thisData = {myembed: 'a'} (object), otherData = 5 (number)
      // transformedData = length = 1 (since otherData not object)
      // Original: false (otherData not object) => skip => retain(1)
      // Mutated: true (thisData is object) => enter
      //   embedType = 'myembed', Object.keys(5) = [] => undefined
      //   'myembed' !== undefined => no handler call
      //   transformedData = 1 => retain(1)
      // Same result, handler not called in either.
      
      // The only meaningful test: both embeds, same key
      // handler IS called in both cases, same result
      const a = new Delta().retain({ myembed: 'a' });
      const b = new Delta().retain({ myembed: 'b' });
      
      const result = a.transform(b, true);
      
      expect(handlerCalled).toBe(true);
      expect(result).toEqual(new Delta().retain({ myembed: { transformed: true } }));
    } finally {
      Delta.unregisterEmbed('myembed');
    }
  });
});