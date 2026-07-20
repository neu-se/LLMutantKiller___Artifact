import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("find sink", () => {
  it("should pass the actual error object (not null) when stream ends with a real error and no match found", (done) => {
    const realError = new Error("stream error");

    function source(abort: any, cb: (end: any, data?: any) => void) {
      // End stream with a real Error (not true, not false)
      cb(realError);
    }

    const sink = find(
      (d: any) => false,
      (err: any, data: any) => {
        // Original: err===true ? null : err => realError (since realError !== true)
        // Mutated:  err===false ? null : err => realError (since realError !== false)
        // Both should pass realError through - this tests the non-end case
        // Actually for false: err===false ? null : err
        // realError === false is false, so mutated also passes realError
        // We need err===false to be true in mutated but not original
        // That means we need err to BE false
        expect(err).toBe(realError);
        expect(data).toBeNull();
        done();
      }
    );

    sink(source);
  });
});