import infinite from "../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js";

describe("infinite source", () => {
  it("should call cb with the end value when end is truthy", () => {
    const source = infinite(() => 42);
    const endValue = new Error("abort");
    
    let callbackCalled = false;
    let callbackArg: any = undefined;
    
    source(endValue, (err: any, data: any) => {
      callbackCalled = true;
      callbackArg = err;
    });
    
    expect(callbackCalled).toBe(true);
    expect(callbackArg).toBe(endValue);
  });
});