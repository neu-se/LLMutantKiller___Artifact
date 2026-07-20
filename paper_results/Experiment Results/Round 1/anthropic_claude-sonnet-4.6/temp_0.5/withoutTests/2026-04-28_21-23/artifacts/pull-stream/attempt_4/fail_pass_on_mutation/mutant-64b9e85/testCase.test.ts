import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should pass null (not true) as error to callback when stream ends normally without finding match", (done) => {
    let callbackArgs: any[] = [];
    
    // Source that emits one non-matching value then ends
    let calls = 0;
    function source(end: any, cb: Function) {
      if (end) return cb(end);
      calls++;
      if (calls === 1) {
        cb(null, "hello");
      } else {
        cb(true); // normal end
      }
    }

    find(
      (data: any) => data === "notfound",
      (...args: any[]) => {
        callbackArgs = args;
        // Original code: err===true ? null : err  => null when err is true
        // Mutated code:  false ? null : err       => true when err is true
        expect(callbackArgs[0]).toStrictEqual(null);
        expect(callbackArgs[1]).toStrictEqual(null);
        done();
      }
    )(source);
  });
});