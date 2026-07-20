import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("drain abort with function as error", () => {
  it("should handle function as error parameter correctly", (done) => {
    const errorFunction = () => {};
    const drain = pull.drain(null, (err) => {
      expect(err).toBe(true);
      done();
    });

    // Call abort with a function as the error parameter
    drain.abort(errorFunction);
  });
});