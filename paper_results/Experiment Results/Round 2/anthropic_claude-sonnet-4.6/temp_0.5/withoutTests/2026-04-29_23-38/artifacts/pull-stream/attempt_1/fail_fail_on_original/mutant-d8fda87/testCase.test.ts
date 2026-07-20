import once from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js"

describe("once source abort behavior", () => {
  it("should call onAbort callback when aborted", (done) => {
    const onAbortCalled = jest.fn();
    const source = once("hello", onAbortCalled);
    
    source(new Error("abort"), (err: any) => {
      expect(err).toBeTruthy();
      expect(onAbortCalled).toHaveBeenCalled();
      done();
    });
  });
});