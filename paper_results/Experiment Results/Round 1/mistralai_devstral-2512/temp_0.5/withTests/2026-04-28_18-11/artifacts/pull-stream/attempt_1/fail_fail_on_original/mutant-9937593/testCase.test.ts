import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("drain with error handling", () => {
  it("should handle error correctly when done callback is not provided", (done) => {
    const error = new Error("test error");
    const mockRead = jest.fn((abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    });

    const sink = drain(null, undefined);
    sink(mockRead);

    setTimeout(() => {
      expect(mockRead).toHaveBeenCalled();
      done();
    }, 100);
  });
});