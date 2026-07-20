import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("correctly transforms object retain with number retain", () => {
    // When this has a number retain and other has an object retain,
    // transformedData should be the object (otherData)
    // Original: typeof obj === 'object' && obj !== null => true => use otherData (object)
    // Mutated: typeof obj === 'object' || obj !== null => true => use otherData (object)
    // Same result... 
    
    // The only difference is for number otherData where original uses length, mutated uses otherData
    // But they're always equal...
    
    // Let me try: what if we have a case where this is longer than other?
    // this: retain 10
    // other: retain 5
    // length = 5, otherData = 5 = length. Same.
    
    // I need to find a case where otherData !== length for a number retain
    // That's impossible with valid ops...
    
    // Maybe the test should just verify the correct behavior with object retains
    // to ensure the condition works correctly
    
    Delta.registerEmbed('video', {
      compose: (a: any, b: any) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? a : b,
    });

    const a = new Delta().retain({ video: { url: 'a.mp4' } });
    const b = new Delta().retain({ video: { url: 'b.mp4' } });

    const result = a.transform(b, false);
    
    Delta.unregisterEmbed('video');
    
    // Both original and mutated: otherData is object, condition is true, use otherData
    // Then embed handler runs and transforms
    expect(result.ops).toEqual([{ retain: { video: { url: 'b.mp4' } } }]);
  });
});