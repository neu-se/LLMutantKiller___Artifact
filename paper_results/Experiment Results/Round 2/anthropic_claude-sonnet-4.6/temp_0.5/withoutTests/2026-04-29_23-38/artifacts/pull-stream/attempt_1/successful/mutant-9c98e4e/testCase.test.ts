import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe("count source", () => {
  it("should include the value equal to max before terminating", (done) => {
    const source = count(3);
    const results: number[] = [];

    function read() {
      source(null, (end: any, value: number) => {
        if (end === true) {
          // Stream ended
          expect(results).toContain(3);
          expect(results).toEqual([0, 1, 2, 3]);
          done();
          return;
        }
        if (end) {
          done(end);
          return;
        }
        results.push(value);
        read();
      });
    }

    read();
  });
});