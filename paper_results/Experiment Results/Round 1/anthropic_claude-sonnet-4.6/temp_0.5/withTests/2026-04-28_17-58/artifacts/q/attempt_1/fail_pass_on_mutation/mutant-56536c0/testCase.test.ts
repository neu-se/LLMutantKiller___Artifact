import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick scheduling order", () => {
  it("should resolve promises in the correct order using the available tick mechanism", () => {
    return new Promise<void>((testResolve, testReject) => {
      const order: number[] = [];

      // Schedule multiple tasks to verify correct ordering
      // The key is that all .then callbacks should run before the setTimeout below
      const d1 = Q.defer();
      const d2 = Q.defer();
      const d3 = Q.defer();

      d1.promise.then(() => { order.push(1); });
      d2.promise.then(() => { order.push(2); });
      d3.promise.then(() => { order.push(3); });

      d1.resolve(undefined);
      d2.resolve(undefined);
      d3.resolve(undefined);

      // Use Q.all to wait for all resolutions
      Q.all([d1.promise, d2.promise, d3.promise]).then(() => {
        // After all promises resolve, verify they ran in order
        expect(order).toEqual([1, 2, 3]);
        
        // Now verify that nextTick actually works by checking
        // that a chained promise resolves correctly
        let tickCount = 0;
        const tickDeferred = Q.defer();
        
        Q.nextTick(() => {
          tickCount++;
          Q.nextTick(() => {
            tickCount++;
            tickDeferred.resolve(tickCount);
          });
        });

        tickDeferred.promise.then((count) => {
          try {
            expect(count).toBe(2);
            testResolve();
          } catch (e) {
            testReject(e);
          }
        }, testReject);
      }, testReject);
    });
  });
});