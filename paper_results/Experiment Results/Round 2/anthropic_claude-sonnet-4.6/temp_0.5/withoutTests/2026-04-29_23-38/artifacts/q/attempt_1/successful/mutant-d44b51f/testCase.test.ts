import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join error message", () => {
  it("should include the specific error message when joining two different values", async () => {
    const x = "valueA";
    const y = "valueB";

    let errorMessage = "";
    try {
      await Q.join(x, y);
    } catch (e: any) {
      errorMessage = e.message;
    }

    expect(errorMessage).toContain("Q can't join: not the same:");
    expect(errorMessage).toContain(x);
    expect(errorMessage).toContain(y);
  });
});