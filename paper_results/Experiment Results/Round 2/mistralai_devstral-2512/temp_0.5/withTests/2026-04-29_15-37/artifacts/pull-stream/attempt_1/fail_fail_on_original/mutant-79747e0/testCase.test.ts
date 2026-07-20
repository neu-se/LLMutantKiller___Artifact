import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("drain with done callback", () => {
  it("should call done callback when stream ends without done", (done) => {
    let doneCalled = false;
    const mockDone = () => {
      doneCalled = true;
    };

    const source = pull.values([1, 2, 3]);
    const sink = drain(null, mockDone);

    pull(source, sink);

    setTimeout(() => {
      expect(doneCalled).toBe(true);
      done();
    }, 100);
  });
});