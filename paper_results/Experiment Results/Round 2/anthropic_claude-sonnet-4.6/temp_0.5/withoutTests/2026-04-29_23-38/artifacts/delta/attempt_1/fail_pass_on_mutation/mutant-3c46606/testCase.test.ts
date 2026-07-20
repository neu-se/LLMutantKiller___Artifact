import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transform with embed handler", () => {
  it("should correctly transform embed ops using registered handler when handler exists", () => {
    const embedType = "test-embed-mutant-3c46606";
    
    Delta.registerEmbed(embedType, {
      compose: (a: unknown, b: unknown, keepNull: boolean) => ({ ...(a as object), ...(b as object) }),
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => ({ transformed: true, priority }),
    });

    try {
      const delta1 = new Delta().retain({ [embedType]: { val: 1 } });
      const delta2 = new Delta().retain({ [embedType]: { val: 2 } });

      const result = delta1.transform(delta2, false);
      
      expect(result.ops).toHaveLength(1);
      expect(result.ops[0].retain).toEqual({ [embedType]: { transformed: true, priority: false } });
    } finally {
      Delta.unregisterEmbed(embedType);
    }
  });
});