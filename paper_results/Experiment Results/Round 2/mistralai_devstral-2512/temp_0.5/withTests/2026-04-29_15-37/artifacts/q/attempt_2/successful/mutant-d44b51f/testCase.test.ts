import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join error message", () => {
  it("should include descriptive message when values are not the same", async () => {
    const x = "foo";
    const y = "bar";
    let errorMessage = "";

    try {
      await Q.join(x, y);
    } catch (error: any) {
      errorMessage = error.message;
    }

    expect(errorMessage).toContain("Q can't join: not the same");
    expect(errorMessage).toContain(x);
    expect(errorMessage).toContain(y);
  });
});