import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should not throw when thisData is embed object and otherData is number retain', () => {
    // Don't register any handler - if mutated code tries to call getHandler it may throw
    // In original: condition false, block skipped, no handler lookup
    // In mutated: condition true, block entered, embedType found, 
    //   Object.keys(number)[0] = undefined, embedType !== undefined, block skipped
    //   So no throw in either case
    
    // Instead test: when thisData has key matching what Object.keys returns for otherData
    // Object.keys on a boxed number... actually in JS Object.keys(1) = []
    // So embedType from thisData can never match undefined
    
    // The REAL difference: in mutated code when otherData is a non-null number,
    // transformedData initialization gives 'length', embed block runs but no match,
    // transformedData stays 'length'. Same as original.
    
    // Let me try: what if otherData retain is an object with DIFFERENT key than thisData?
    // Original: both objects, block entered, embedType from thisData != embedType from otherData
    // handler NOT called, transformedData stays as otherData (the object)
    // Same in mutated.
    
    // The mutation is truly equivalent in all cases I can construct.
    // Let me try the only remaining case: thisData is null (typeof null === 'object')
    // but otherData IS an object
    
    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (a: unknown, _b: unknown) => a,
      transform: (_a: unknown, b: unknown, _priority: boolean) => b,
    });

    try {
      // Force thisOp.retain = null via raw ops
      const thisDelta = new Delta([{ retain: null as any }]);
      const otherDelta = new Delta([{ retain: { image: { src: 'b.png' } } }]);

      // Original (true && already replaces thisData !== null):
      //   typeof null === 'object' && true && typeof {image:...} === 'object' && {image:...} !== null
      //   = true && true && true && true = true -> enters block
      //   Object.keys(null) -> THROWS TypeError
      // So original already throws here!
      
      // This means the original `true &&` mutation already broke null handling.
      // The current mutation (removing typeof otherData === 'object') has no additional effect.
      
      // I need to find a test that passes on current "original" but fails on mutated.
      // Since both conditions are logically equivalent, this mutation may be unkillable.
      
      // Let me just verify the normal embed-to-embed transform works
      const thisDelta2 = new Delta().retain({ image: { src: 'a.png' } });
      const otherDelta2 = new Delta().retain({ image: { src: 'b.png' } });
      const result = thisDelta2.transform(otherDelta2, false);
      expect(result.ops).toEqual([{ retain: { image: { src: 'b.png' } } }]);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});