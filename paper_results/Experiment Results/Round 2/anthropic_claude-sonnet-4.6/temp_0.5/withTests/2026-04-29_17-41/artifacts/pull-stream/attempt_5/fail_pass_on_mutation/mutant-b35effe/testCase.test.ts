import pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe("find - stream ends without match", () => {
  it("should pass null (not true) as error to callback when stream ends without finding a match", (done) => {
    let capturedErr: any = undefined;
    let capturedResult: any = undefined;
    let callbackCalled = false;

    pull(
      pull.values([1, 2, 3]),
      pull.find(
        (d: number) => d === 999, // never matches - forces end-of-stream path
        (err: any, result: any) => {
          capturedErr = err;
          capturedResult = result;
          callbackCalled = true;

          // On original: err === true ? null : err => cb(null, null)
          // On mutated:  err !== true ? null : err => cb(true, null)
          if (err !== null) {
            done(new Error(`Expected err to be null but got: ${JSON.stringify(err)}`));
          } else if (result !== null) {
            done(new Error(`Expected result to be null but got: ${JSON.stringify(result)}`));
          } else {
            done();
          }
        }
      )
    );
  });
});