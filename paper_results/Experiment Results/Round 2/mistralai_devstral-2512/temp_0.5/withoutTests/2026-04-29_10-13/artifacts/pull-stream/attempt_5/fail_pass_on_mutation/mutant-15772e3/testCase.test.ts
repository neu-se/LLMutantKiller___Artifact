const filterModule = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js");

describe("filter mutation test", () => {
  it("should correctly handle sync/async filtering behavior with immediate rejection", () => {
    const testData = [1, 3, 5, 2, 4]; // First 3 items should be rejected
    const expectedFiltered = [2, 4];
    const filteredResults: number[] = [];
    let callOrder: string[] = [];

    const read = (end: any, callback: (end: any, data?: any) => void) => {
      if (testData.length === 0) {
        callOrder.push("end");
        return callback(true);
      }

      const data = testData.shift();
      callOrder.push(`read-${data}`);

      // First 3 calls should be synchronous (all rejected)
      if (callOrder.length <= 4) {
        callback(null, data);
      } else {
        // Subsequent calls should be asynchronous
        setImmediate(() => {
          callback(null, data);
        });
      }
    };

    const filterFn = filterModule((data: number) => data % 2 === 0);
    const filteredRead = filterFn(read);

    const collect = (end: any, data?: any) => {
      if (end) {
        callOrder.push("collect-end");
        expect(filteredResults).toEqual(expectedFiltered);
        // Verify call order shows proper sync/async handling
        expect(callOrder).toEqual([
          "read-1", "read-3", "read-5", "read-2",
          "collect-2", "read-4", "collect-4", "end", "collect-end"
        ]);
        return;
      }
      callOrder.push(`collect-${data}`);
      filteredResults.push(data);
    };

    filteredRead(null, collect);
  });
});