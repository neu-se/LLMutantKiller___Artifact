import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("find sink", () => {
  it("debug drain behavior", (done) => {
    // First understand what drain passes to end callback
    let endValue: any = undefined;
    
    function source(abort: any, cb: (end: any, data?: any) => void) {
      cb(true); // normal end
    }

    const sink = drainModule(
      (d: any) => {},
      (err: any) => {
        endValue = err;
        console.log("drain end callback received:", err, typeof err);
        
        // Now test find with same source
        let i2 = 0;
        function source2(abort: any, cb: (end: any, data?: any) => void) {
          cb(true);
        }
        
        const findSink = find(
          (d: any) => false,
          (findErr: any, data: any) => {
            console.log("find callback received err:", findErr, typeof findErr, "data:", data);
            expect(findErr).toBeNull();
            done();
          }
        );
        findSink(source2);
      }
    );

    sink(source);
  });
});