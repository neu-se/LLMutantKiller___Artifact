import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fcall", () => {
  it("should call the function with provided arguments and return a fulfilled promise", async () => {
    const result = await Q.fcall(function(a: number, b: number, c: number) {
      return a + b + c;
    }, 1, 2, 3);
    
    expect(result).toBe(6);
  });
});