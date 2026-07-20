import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick scheduling", () => {
  it("should schedule tasks using process.nextTick before setImmediate", async () => {
    const order: string[] = [];
    
    return new Promise<void>((resolve) => {
      setImmediate(() => {
        order.push("setImmediate");
        resolve();
      });
      
      Q.when(1).then(() => {
        order.push("Q.then");
      });
      
      // In original: Q uses process.nextTick, so Q.then fires before setImmediate
      // In mutated: Q uses setImmediate, so order may differ
    }).then(() => {
      expect(order[0]).toBe("Q.then");
    });
  });
});