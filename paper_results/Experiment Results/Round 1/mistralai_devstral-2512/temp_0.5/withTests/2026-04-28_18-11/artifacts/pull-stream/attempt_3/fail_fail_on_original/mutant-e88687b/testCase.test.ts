import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

declare module "../../../../../../../../../../../subject_repositories/pull-stream/pull.js" {
  interface Pull {
    drain: (op?: (data: any) => boolean, done?: (err?: any) => void) => any;
  }
}

describe("drain abort with function as error", () => {
  it("should handle function as error parameter correctly", (done) => {
    const errorFunction = () => {};
    const drain = (pull as any).drain(null, (err: any) => {
      expect(err).toBe(true);
      done();
    });

    // Call abort with a function as the error parameter
    drain.abort(errorFunction);
  });
});