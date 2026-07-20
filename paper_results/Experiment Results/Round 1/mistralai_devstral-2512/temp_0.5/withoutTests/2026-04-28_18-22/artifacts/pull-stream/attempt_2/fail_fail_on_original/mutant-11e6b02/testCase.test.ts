import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take mutation test", () => {
  it("should correctly handle termination when last is false", (done) => {
    const takeStream = take(2, { last: false });

    let callCount = 0;
    const mockRead = (end: any, cb: (end: any, data?: any) => void) => {
      callCount++;
      if (callCount === 1) {
        cb(null, 1);
      } else if (callCount === 2) {
        cb(null, 2);
      } else if (callCount === 3) {
        cb(true);
      }
    };

    const read = takeStream(mockRead);

    read(null, (end: any, data: any) => {
      if (end) {
        expect(data).toBeUndefined();
        expect(callCount).toBe(3);
        done();
      } else {
        expect(data).toBeDefined();
      }
    });
  });
});