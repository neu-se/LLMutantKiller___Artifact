import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.return", () => {
  it("should throw an object with the provided value as its value property", () => {
    let thrown: any = null;
    try {
      Q["return"](99);
    } catch (e) {
      thrown = e;
    }
    expect(thrown).not.toBeNull();
    expect(thrown.value).toBe(99);
    // The thrown object should be recognized as a stop iteration
    // (i.e., it is an instance of QReturnValue, not a plain Error)
    expect(thrown instanceof Error).toBe(false);
  });
});