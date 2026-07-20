import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race mutation test", () => {
  it("should correctly handle empty array input", () => {
    return Q.race([]).then(
      (result: unknown) => {
        // Empty array should resolve to undefined
        expect(result).toBeUndefined();
      },
      (error: Error) => {
        throw error;
      }
    );
  });
});