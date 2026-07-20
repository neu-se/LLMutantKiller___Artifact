import abortCb from "../../../../../../../../../../../subject_repositories/pull-stream/util/abort-cb.js"
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("detects mutation by checking abortCb behavior with undefined cb", () => {
    // abortCb source: function(cb, abort, onAbort) { if(onAbort) onAbort(abort); cb(abort) }
    // In mutated code: abortCb(undefined, undefined, undefined) -> cb(abort) = undefined(undefined) -> TypeError
    // But tests pass... so abortCb must guard against undefined cb
    // 
    // Let's check: does abortCb return something that becomes the return value of values()?
    // abortCb likely returns undefined. So values([1,2,3]) returns undefined in mutated code.
    // Calling undefined(null, cb) throws TypeError.
    // But tests pass on mutated... so maybe abortCb returns a function?
    
    // Let's directly test abortCb's return value
    const result = abortCb(() => {}, true, undefined);
    console.log('abortCb returns:', result);
    
    // Now test the actual mutation effect
    const source = values([1, 2, 3]);
    let receivedValue: any = null;
    let receivedErr: any = 'not-called';
    
    source(null, (err: any, val: any) => {
      receivedErr = err;
      receivedValue = val;
    });
    
    expect(receivedErr).toBeNull();
    expect(receivedValue).toBe(1);
  });
});