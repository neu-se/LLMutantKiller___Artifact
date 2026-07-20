import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain abort with function as error", () => {
  it("should handle function as error parameter correctly", (done) => {
    const errorFunction = () => {};
    const sink = drain(null, (err) => {
      expect(err).toBe(true);
      done();
    });

    // Call abort with a function as the error parameter
    sink.abort(errorFunction);
  });
});