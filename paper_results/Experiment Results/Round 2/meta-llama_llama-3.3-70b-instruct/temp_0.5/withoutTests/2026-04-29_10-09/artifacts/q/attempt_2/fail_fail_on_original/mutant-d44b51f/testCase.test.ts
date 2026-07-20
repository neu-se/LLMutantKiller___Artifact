import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.join", () => {
  it("should throw an error with a specific message when the values are not the same", () => {
    const error = new Error();
    try {
      Q.join(Q(1), Q(2));
    } catch (e) {
      error = e;
    }
    expect(error.message).toContain("Q can't join: not the same: 1 2");
  });
});