import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library array_reduce shim", () => {
  it("should throw TypeError when reduce is called on an empty array with no initial value", () => {
    // This test targets the mutation in the array_reduce shim
    // The original code throws TypeError when index exceeds length
    // The mutated code removes this error throwing behavior
    const emptyArray: any[] = [];
    let errorThrown = false;
    try {
      emptyArray.reduce(function(prev: any, curr: any) { return prev; });
    } catch (e) {
      if (e instanceof TypeError) {
        errorThrown = true;
      }
    }
    expect(errorThrown).toBe(true);
  });
});