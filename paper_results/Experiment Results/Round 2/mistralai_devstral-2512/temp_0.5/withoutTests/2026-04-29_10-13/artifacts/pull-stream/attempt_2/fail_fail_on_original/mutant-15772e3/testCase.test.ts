const filterModule = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js");

describe("filter mutation test", () => {
  it("should correctly handle sync/async filtering behavior", (done) => {
    const testData = [1, 2, 3, 4, 5];
    const expectedFiltered = [2, 4];
    const filteredResults: number[] = [];

    // Create a readable stream that emits data synchronously first, then asynchronously
    let callCount = 0;
    const read = (end: any, callback: (end: any, data?: any) => void) => {
      if (testData.length === 0) {
        return callback(true); // end
      }

      callCount++;
      const data = testData.shift();

      if (callCount <= 2) {
        // First two calls should be synchronous
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

    // Collect results
    const collect = (end: any, callback: (end: any, data?: any) => void) => {
      if (end) {
        // Verify results
        expect(filteredResults).toEqual(expectedFiltered);
        done();
        return callback(end);
      }
      filteredResults.push(callback.arguments[1]);
      callback(null);
    };

    filteredRead(null, collect);
  });
});