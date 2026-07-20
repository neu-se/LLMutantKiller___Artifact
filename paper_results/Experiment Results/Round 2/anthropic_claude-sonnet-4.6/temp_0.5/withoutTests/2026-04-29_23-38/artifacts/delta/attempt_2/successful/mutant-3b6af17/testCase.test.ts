import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transform embed handling", () => {
  it("should not invoke embed handler when thisData is a number (not an object)", () => {
    const transformCalls: any[] = [];
    
    // Register handler for 'undefined' key to detect if it gets called
    Delta.registerEmbed('undefined' as any, {
      compose: (a: any, b: any, keepNull: boolean) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => {
        transformCalls.push({ a, b, priority });
        return { mutated: true };
      },
    });

    try {
      const thisDelta = new Delta().retain(1);
      const otherDelta = new Delta().retain({} as any);

      const result = thisDelta.transform(otherDelta, false);

      // Original: thisData=1 is not an object, skip embed block, transformedData={}
      // Mutated: enters embed block, Object.keys(1)=[], embedType=undefined,
      //          undefined===undefined (Object.keys({})[0]), calls handler
      expect(transformCalls).toHaveLength(0);
      expect(result.ops).toEqual([{ retain: {} }]);
    } finally {
      Delta.unregisterEmbed('undefined' as any);
    }
  });
});