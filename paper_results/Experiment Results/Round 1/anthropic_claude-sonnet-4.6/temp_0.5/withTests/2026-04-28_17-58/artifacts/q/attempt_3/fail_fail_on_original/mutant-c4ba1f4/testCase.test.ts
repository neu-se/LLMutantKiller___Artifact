import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q scheduling order", () => {
  it("should schedule promise resolution after setTimeout(fn, 0) when using setImmediate", () => {
    return new Promise<void>((resolve, reject) => {
      const order: string[] = [];

      // setTimeout callback runs after process.nextTick but before or around setImmediate
      // With original (setImmediate): setTimeout fires before Q flush
      // With mutated (process.nextTick): Q flush fires before setTimeout

      setTimeout(() => {
        order.push("setTimeout");
      }, 0);

      const deferred = Q.defer();
      deferred.resolve(1);
      deferred.promise.then(() => {
        order.push("promise");
      });

      // Check after everything has settled
      setTimeout(() => {
        setTimeout(() => {
          try {
            // Original uses setImmediate: setTimeout("setTimeout") runs before setImmediate("promise")
            expect(order[0]).toBe("setTimeout");
            expect(order[1]).toBe("promise");
            resolve();
          } catch (e) {
            reject(e);
          }
        }, 50);
      }, 50);
    });
  });
});