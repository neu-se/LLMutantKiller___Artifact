import { map } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";

describe("map with no mapper argument", () => {
  it("should act as identity function when called with no argument, passing data through unchanged", (done) => {
    const mapThrough = map(undefined);

    const inputData = [1, 2, 3];
    let index = 0;

    // Create a simple source that reads from inputData
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      if (index >= inputData.length) {
        cb(true);
        return;
      }
      cb(null, inputData[index++]);
    };

    const reader = mapThrough(source);
    const results: number[] = [];

    const readNext = () => {
      reader(null, (end: any, data: any) => {
        if (end === true) {
          expect(results).toEqual([1, 2, 3]);
          done();
          return;
        }
        if (end) {
          done(end);
          return;
        }
        results.push(data);
        readNext();
      });
    };

    readNext();
  });
});