import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take mutation test", () => {
  it("should correctly handle termination with last=true", (done) => {
    const test = take(2, { last: true });
    let count = 0;
    const expected = [1, 2];

    const read = test((end, cb) => {
      if (end) {
        expect(count).toBe(2);
        done();
        return;
      }
      count++;
      if (count <= 2) {
        cb(null, count);
      } else {
        cb(true);
      }
    });

    read(null, (end, data) => {
      if (end) return;
      expect(data).toBe(expected[count - 1]);
    });
  });
});