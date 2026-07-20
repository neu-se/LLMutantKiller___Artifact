import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("should call onAbort only when abort is truthy, not on normal reads", () => {
    const onAbortCalled: any[] = [];
    const onAbort = (err: any) => onAbortCalled.push(err);
    
    const source = values([1, 2, 3], onAbort);
    
    return new Promise<void>((resolve, reject) => {
      source(null, (err: any, val: any) => {
        try {
          // Original: onAbort should NOT be called on normal read (abort=null)
          // Mutated: onAbort IS called because if(true) fires abortCb unconditionally
          expect(onAbortCalled.length).toBe(0);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  });
});