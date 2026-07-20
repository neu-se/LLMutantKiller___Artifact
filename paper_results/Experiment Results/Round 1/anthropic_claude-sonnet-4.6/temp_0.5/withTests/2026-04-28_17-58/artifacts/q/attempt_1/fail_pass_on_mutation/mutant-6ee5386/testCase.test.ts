import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("fin callback validation", () => {
  it("should throw an error with correct message when fin is called with an invalid callback", () => {
    let threw = false;
    let errorMessage = "";

    try {
      Q().fin(undefined);
    } catch (err: any) {
      threw = true;
      errorMessage = err.message;
    }

    expect(threw).toBe(true);
    expect(errorMessage).toBe("Q can't apply finally callback");
  });
});