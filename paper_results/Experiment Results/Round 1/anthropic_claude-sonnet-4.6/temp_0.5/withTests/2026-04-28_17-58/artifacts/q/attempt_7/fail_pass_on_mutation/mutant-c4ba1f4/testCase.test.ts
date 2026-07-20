import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q setImmediate scheduling", () => {
  it("Q task should execute before a subsequently scheduled process.nextTick when using setImmediate", () => {
    return new Promise<void>((resolve, reject) => {
      const order: string[] = [];

      Q.nextTick(() => {
        order.push("Q");
      });

      process.nextTick(() => {
        order.push("native-nextTick");
      });

      setImmediate(() => {
        setImmediate(() => {
          try {
            // Original uses setImmediate: Q's setImmediate fires, then process.nextTick drains
            // So Q comes before native-nextTick
            expect(order).toEqual(["Q", "native-nextTick"]);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
    });
  });
});