import { filter } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";
import { Readable } from "stream";

describe("filter mutation test", () => {
  it("should correctly handle async filtering with multiple data chunks", (done) => {
    const testData = [1, 2, 3, 4, 5];
    const expectedFiltered = [2, 4];
    const filteredResults: number[] = [];

    // Create a readable stream that emits data asynchronously
    const read = (end: any, callback: (end: any, data?: any) => void) => {
      if (testData.length === 0) {
        return callback(true); // end
      }
      // Simulate async behavior with setImmediate
      setImmediate(() => {
        const data = testData.shift();
        callback(null, data);
      });
    };

    const filterFn = filter((data: number) => data % 2 === 0);
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