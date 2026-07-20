import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.join", () => {
  it("should throw an error that starts with 'Q can\'t join' when the values are not the same", () => {
    let error;
    try {
      Q.join(Q(1), Q(2));
    } catch (e: any) {
      error = e;
    }
    expect(error).toBeInstanceOf(Error);
    expect(typeof error.message).toBe('string');
    expect(error.message).toMatch(/^Q can't join/);
  });
});