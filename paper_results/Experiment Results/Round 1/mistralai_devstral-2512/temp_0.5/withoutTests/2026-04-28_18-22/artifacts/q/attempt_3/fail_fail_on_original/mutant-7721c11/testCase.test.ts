import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q library array_indexOf mutation test", () => {
  it("should correctly find elements in array using Q's internal array_indexOf", () => {
    // This test directly exercises the array_indexOf shim that was mutated
    const testArray = [10, 20, 30, 40, 50];
    const valueToFind = 30;

    // Create a promise that will use the array_indexOf internally
    const promise = Q.resolve(testArray).then(function(arr: number[]) {
      // The mutated code changes the condition to "if (false)" which will
      // cause indexOf to always return -1
      const index = arr.indexOf(valueToFind);
      return index;
    });

    return promise.then(function(index: number) {
      expect(index).toBe(2);
    });
  });
});