import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should not call onAbort when creating a values source with a valid array", () => {
    let abortCalled = false;
    const onAbort = () => { abortCalled = true; };

    // In original: if(abort) is false (abort is undefined in outer scope), so onAbort is NOT called
    // In mutated: if(true) always runs, calling abortCb(undefined, undefined, onAbort) which calls onAbort
    values([1, 2, 3], onAbort);

    expect(abortCalled).toBe(false);
  });
});