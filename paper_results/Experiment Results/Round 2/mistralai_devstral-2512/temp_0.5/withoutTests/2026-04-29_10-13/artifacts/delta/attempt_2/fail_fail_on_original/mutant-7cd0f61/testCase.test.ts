import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta diff method", () => {
  it("should throw correct error message when diff is called on non-document", () => {
    const delta1 = new Delta([{ insert: "test" }]);
    const delta2 = new Delta([{ retain: 1 }]);

    expect(() => {
      delta1.diff(delta2);
    }).toThrow("diff() called with non-document");
  });
});