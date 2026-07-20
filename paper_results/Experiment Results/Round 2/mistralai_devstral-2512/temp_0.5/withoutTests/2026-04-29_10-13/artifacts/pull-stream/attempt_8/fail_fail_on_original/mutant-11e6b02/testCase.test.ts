import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take mutation test", () => {
  it("should correctly handle termination with last=true", (done) => {
    const test = take(1, { last: true });
    let count = 0;
    let terminated = false;

    const read = test((end: boolean, cb: (end: boolean | null, data?: number) => void) => {
      if (end) {
        terminated = true;
        expect(count).toBe(1);
        done();
        return;
      }
      count++;
      if (count <= 1) {
        cb(null, count);
      } else {
        cb(true);
      }
    });

    read(null, (end: boolean | null, data?: number) => {
      if (end) {
        if (!terminated) {
          expect(terminated).toBe(true);
          done();
        }
        return;
      }
      expect(data).toBe(1);
    });
  });
});