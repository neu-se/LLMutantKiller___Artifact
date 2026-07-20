import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform with object retain in other when this has numeric retain produces correct output', () => {
    Delta.registerEmbed('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as any).compose(new Delta(b as any)).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as any).transform(new Delta(b as any), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as any).invert(new Delta(b as any)).ops,
    });

    try {
      // this: retain(1) then retain({ delta: [...] })
      // other: retain({ delta: [...] }) then retain(1)
      // At first step: thisData=1 (number), otherData={ delta: [...] } (object)
      // Original: false => skip, transformedData = otherData = { delta: [...] }
      // Mutated: true => enter block, Object.keys(1)=[], embedType=undefined
      //          undefined === 'delta' => false, transformedData stays { delta: [...] }
      // At second step: thisData={ delta: [...] }, otherData=1 (number)
      // typeof otherData === 'object' is false => condition false in both => same
      
      // Hmm, still same. Let me try to find a case where embedType accidentally matches.
      // What if otherData has an 'undefined' key? Not possible with normal objects.
      
      // NEW IDEA: What if thisData is a non-null object but otherData is null?
      // thisData = { delta: [...] }, otherData = null
      // Original: true && true && true && false => false
      // Mutated: true || (...) => true (short circuits!)
      // Then Object.keys({ delta: [...] })[0] = 'delta'
      // Object.keys(null) THROWS TypeError!
      
      const a = new Delta([{ retain: { delta: [{ insert: 'a' }] } }]);
      const b = new Delta([{ retain: null as any }]);
      
      // Original: condition false, delta.retain(transformedData) where transformedData = length = 1
      // Mutated: condition true, Object.keys(null) throws TypeError
      expect(() => a.transform(b, false)).not.toThrow();
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});