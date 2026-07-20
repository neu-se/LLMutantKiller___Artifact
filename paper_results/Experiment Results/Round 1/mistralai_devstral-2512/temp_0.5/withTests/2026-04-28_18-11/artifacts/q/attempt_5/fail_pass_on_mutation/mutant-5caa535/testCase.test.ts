// Test case to detect the mutation in array_indexOf
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
  it("should detect out-of-bounds access in array_indexOf with sparse arrays", () => {
    // Create a sparse array where the mutation would cause observable behavior
    const sparseArray = [1, , 3]; // eslint-disable-line no-sparse-arrays
    sparseArray[5] = 5;

    // The mutation changes i < this.length to i <= this.length
    // This causes an extra iteration where i equals array length
    // In sparse arrays, this might access a non-existent property

    // Test searching for a value that doesn't exist
    // In original code: should return -1
    // In mutated code: might return unexpected results due to out-of-bounds access
    const result = sparseArray.indexOf(99);
    expect(result).toBe(-1);

    // Test with an array that has a specific length but fewer elements
    const arrayWithLength = [1, 2];
    arrayWithLength.length = 5; // Set length longer than actual elements

    // Search for a value that doesn't exist
    // In original code: should return -1
    // In mutated code: might access arrayWithLength[5] which is undefined
    const lengthResult = arrayWithLength.indexOf(99);
    expect(lengthResult).toBe(-1);

    // Verify the array state hasn't changed
    expect(arrayWithLength.length).toBe(5);
    expect(arrayWithLength[2]).toBeUndefined();
    expect(arrayWithLength[3]).toBeUndefined();
    expect(arrayWithLength[4]).toBeUndefined();
  });
});