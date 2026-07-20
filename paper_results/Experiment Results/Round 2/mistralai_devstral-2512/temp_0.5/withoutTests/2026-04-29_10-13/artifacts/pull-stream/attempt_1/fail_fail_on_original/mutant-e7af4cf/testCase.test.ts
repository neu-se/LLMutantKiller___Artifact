import { filter } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";
import { Readable } from "stream";

describe("filter mutation test", () => {
  it("should handle synchronous data correctly", (done) => {
    const testData = [1, 2, 3, 4, 5];
    let receivedData: number[] = [];
    let callCount = 0;

    const read = (end: any, cb: (end: any, data?: any) => void) => {
      callCount++;
      if (callCount > testData.length) {
        cb(true);
        return;
      }
      const data = testData[callCount - 1];
      if (data % 2 === 0) {
        // Even numbers should be filtered out
        cb(null, data);
      } else {
        // Odd numbers should pass through
        cb(null, data);
      }
    };

    const filteredRead = filter((data: number) => data % 2 !== 0)(read);

    filteredRead(null, (end: any, data?: any) => {
      if (end) {
        expect(receivedData).toEqual([1, 3, 5]);
        done();
      } else if (data !== undefined) {
        receivedData.push(data);
      }
    });
  });
});