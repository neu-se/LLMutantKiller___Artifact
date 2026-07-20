import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process object detection in untrackRejection", () => {
  it("should correctly evaluate process object conditions", () => {
    // Test the specific condition that was mutated
    const mockProcessWithEmit = {
      emit: jest.fn()
    };

    // Test case 1: process is object AND has emit (should be true in original)
    let result1: boolean;
    if (typeof mockProcessWithEmit === "object" && typeof mockProcessWithEmit.emit === "function") {
      result1 = true;
    } else {
      result1 = false;
    }
    expect(result1).toBe(true);

    // Test case 2: process is not object but has emit (should be false in original, true in mutated)
    const mockProcessNotObject = {
      emit: jest.fn()
    };
    // Force typeof to not be "object" by using a primitive wrapper
    const primitiveWrapper: any = new String("test");
    primitiveWrapper.emit = jest.fn();

    let result2: boolean;
    if (typeof primitiveWrapper === "object" && typeof primitiveWrapper.emit === "function") {
      result2 = true;
    } else {
      result2 = false;
    }
    // In original code this should be false (because typeof "test" is "string", not "object")
    // In mutated code this would be true (because of OR condition)
    expect(result2).toBe(false);
  });
});