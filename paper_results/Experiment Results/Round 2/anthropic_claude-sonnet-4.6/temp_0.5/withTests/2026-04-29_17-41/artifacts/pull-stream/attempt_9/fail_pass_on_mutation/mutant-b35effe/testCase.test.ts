import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find", () => {
  it("should pass null (not true) as error when no match found and stream ends normally", (done) => {
    const emptySource = (_abort: any, cb: (end: any, data?: any) => void) => {
      cb(true);
    };

    const sink = find(
      () => false,
      (err: any, _result: any) => {
        // Strict identity check - must be exactly null, not true
        if (err === true) {
          done(new Error("err was `true` instead of `null` - mutation detected"));
        } else if (err === null) {
          done();
        } else {
          done(new Error(`Unexpected err value: ${String(err)}`));
        }
      }
    );

    sink(emptySource);
  });
});