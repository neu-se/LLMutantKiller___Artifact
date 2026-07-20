import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("transform()", () => {
  it("skips embed transform when handler is falsy, keeping otherData as transformedData", () => {
    // Bypass getHandler's throw by making it return a truthy-but-weird value
    // Actually, let's use a Proxy to intercept getHandler
    const originalGetHandler = (Delta as any).getHandler.bind(Delta);
    let callCount = 0;
    (Delta as any).getHandler = (embedType: string) => {
      callCount++;
      // Return falsy on first call to simulate if(handler) being false
      if (callCount === 1) return null;
      return originalGetHandler(embedType);
    };

    Delta.registerEmbed<{ val: number }>("myEmbed", {
      compose: (a: { val: number }, b: { val: number }) => ({ val: a.val + b.val }),
      transform: (_a: { val: number }, _b: { val: number }, _priority: boolean) => ({ val: 99 }),
      invert: (_a: { val: number }, b: { val: number }) => b,
    });

    const a = new Delta().retain({ myEmbed: { val: 1 } });
    const b = new Delta().retain({ myEmbed: { val: 2 } });

    try {
      const result = a.transform(b, true);
      // Original: if(handler) with null handler -> skip -> transformedData stays as {myEmbed: {val:2}}
      // Mutated: if(true) -> tries to call null.transform -> throws TypeError
      expect(result).toEqual(new Delta().retain({ myEmbed: { val: 2 } }));
    } finally {
      (Delta as any).getHandler = originalGetHandler;
      Delta.unregisterEmbed("myEmbed");
    }
  });
});