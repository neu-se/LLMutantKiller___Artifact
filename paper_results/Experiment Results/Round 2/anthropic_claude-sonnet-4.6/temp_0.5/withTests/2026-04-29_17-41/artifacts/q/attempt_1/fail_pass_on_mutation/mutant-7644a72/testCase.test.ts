import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.return behavior", () => {
  it("should throw a QReturnValue that is recognized by Q.async generators", async () => {
    const result = await Q.async(function* () {
      return 42;
    })();
    
    expect(result).toBe(42);
  });
});