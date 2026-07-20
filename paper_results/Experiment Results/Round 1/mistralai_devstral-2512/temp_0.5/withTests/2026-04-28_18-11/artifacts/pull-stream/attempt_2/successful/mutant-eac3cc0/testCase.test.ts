import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("drain mutation test", () => {
  it("should abort with truthy value when op returns false", (done) => {
    let abortCalledWith: any = null;
    const mockRead = (abort: any, cb: (end: any, data?: any) => void) => {
      abortCalledWith = abort;
      cb(null);
    };

    const sink = drain((data: any) => {
      return false;
    });

    sink(mockRead);

    expect(abortCalledWith).toBe(true);
    done();
  });
});