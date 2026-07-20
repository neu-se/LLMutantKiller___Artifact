import { filter } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";
import { Readable } from "stream";

describe('filter mutation test', () => {
  it('should correctly filter out non-matching data in async mode', (done) => {
    const testData = [1, 2, 3, 4, 5];
    const expectedFiltered = [2, 4];
    const results: number[] = [];

    // Create a readable stream that emits data asynchronously
    const read = (end: any, callback: (end: any, data: any) => void) => {
      setTimeout(() => {
        if (testData.length === 0) {
          callback(true, null); // End signal
        } else {
          const data = testData.shift();
          callback(false, data);
        }
      }, 0);
    };

    const filteredRead = filter((data: number) => data % 2 === 0)(read);

    const process = () => {
      filteredRead(null, (end: any, data: any) => {
        if (end) {
          expect(results).toEqual(expectedFiltered);
          done();
        } else {
          results.push(data);
          setTimeout(process, 0); // Continue processing asynchronously
        }
      });
    };

    process();
  });
});