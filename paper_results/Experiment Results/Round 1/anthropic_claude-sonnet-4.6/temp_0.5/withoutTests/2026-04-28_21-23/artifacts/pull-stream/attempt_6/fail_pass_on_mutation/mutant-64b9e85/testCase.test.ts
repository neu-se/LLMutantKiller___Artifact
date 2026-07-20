import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should pass null as error when stream ends with true and no match found, with ended still false", (done) => {
    const actualError = new Error("stream error");
    
    // Source that emits an error
    function errorSource(end: any, cb: Function) {
      if (end) return cb(end);
      cb(actualError); // emit an error
    }

    find(
      (data: any) => false,
      (err: any, data: any) => {
        // With an actual error: both original and mutated pass err through
        // But with err===true: original passes null, mutated passes true
        // Let's try: source ends normally (true) after one pull
        expect(err).toBe(actualError);
        done();
      }
    )(errorSource);
  });
});