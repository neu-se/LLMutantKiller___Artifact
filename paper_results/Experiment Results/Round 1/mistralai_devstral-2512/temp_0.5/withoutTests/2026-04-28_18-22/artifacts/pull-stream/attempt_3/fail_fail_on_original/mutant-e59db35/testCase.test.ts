import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe("flatten abort error handling", () => {
  it("should pass abort signal when err is falsy", (done) => {
    const abortSignal = new Error("abort error");
    let readArgs = [];

    const mockRead = (abort, cb) => {
      readArgs.push({ abort, cb });
      if (abort) {
        // Original: read(err || abort, cb) → passes abort when err is falsy
        // Mutated: read(err && abort, cb) → passes false when err is falsy
        cb(abort);
      } else {
        cb(null, [1, 2, 3]);
      }
    };

    const flattened = flatten()(mockRead);

    flattened(null, (end, data) => {
      // Trigger abort path with falsy err
      flattened(true, (err) => {
        expect(readArgs.length).toBe(2);
        expect(readArgs[1].abort).toBe(true);
        expect(err).toBe(abortSignal);
        done();
      });
    });
  });
});