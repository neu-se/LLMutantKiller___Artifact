import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap with null map function', () => {
  it('should pass through data unchanged when map function is null', (done) => {
    const testData = [1, 2, 3];
    let index = 0;

    const source = (abort, cb) => {
      if (index >= testData.length) {
        cb(true);
      } else {
        cb(null, testData[index++]);
      }
    };

    const transform = asyncMap(null);
    const sink = (abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, (end, data) => {
          if (end) {
            expect(index).toBe(testData.length);
            done();
          } else {
            expect(data).toBe(testData[index - 1]);
          }
        });
      }
    };

    transform(source)(null, sink);
  });
});