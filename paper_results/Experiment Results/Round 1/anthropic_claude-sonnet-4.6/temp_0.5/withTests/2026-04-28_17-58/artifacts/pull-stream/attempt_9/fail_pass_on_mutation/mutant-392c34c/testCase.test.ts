import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("find sink", () => {
  it("drain end callback receives true when source ends normally, find should convert it to null", (done) => {
    // First verify what drain passes to end callback
    let drainEndValue: any = "NOT_CALLED";
    
    function makeSource() {
      return function source(abort: any, cb: (end: any, data?: any) => void) {
        // immediately end with true (normal pull-stream end)
        cb(true);
      };
    }

    // Check what drain passes to its end callback
    const drainSink = drain(
      (_d: any) => {},
      (err: any) => {
        drainEndValue = err;
        
        // Now test find - if drain passes `true` to find's end handler:
        // Original converts true->null, mutated does NOT convert true->null
        const findSink = find(
          (_d: any) => false,
          (findErr: any, _data: any) => {
            // If drain passes true to find's end handler:
            // original: null, mutated: true
            // If drain passes null to find's end handler:
            // both: null (no difference detectable)
            if (drainEndValue === true) {
              // drain passes true, so find should convert to null
              expect(findErr).toBeNull();
            } else {
              // drain already converts, so we need different approach
              expect(drainEndValue).toBe(null); // document what drain does
              expect(findErr).toBeNull();
            }
            done();
          }
        );
        findSink(makeSource());
      }
    );
    drainSink(makeSource());
  });
});