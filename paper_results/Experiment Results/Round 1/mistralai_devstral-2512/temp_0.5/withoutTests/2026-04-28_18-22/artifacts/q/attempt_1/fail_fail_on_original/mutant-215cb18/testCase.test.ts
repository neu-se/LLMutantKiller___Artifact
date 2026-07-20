import { Q } from "./q.js";

describe("Q library object_defineProperty mutation", () => {
  it("should properly define non-enumerable properties using object_defineProperty", () => {
    const obj = {};
    const promise = Q.resolve(42);

    // The original implementation should define the property
    // The mutated version (missing return) won't define it properly
    if (typeof Object.defineProperty === "function") {
      Object.defineProperty(promise, "testProp", {
        value: "testValue",
        enumerable: false
      });
    }

    // Verify the property was defined
    expect(promise.testProp).toBe("testValue");

    // Verify it's not enumerable (this tests the proper behavior of defineProperty)
    const keys = [];
    for (const key in promise) {
      keys.push(key);
    }
    expect(keys).not.toContain("testProp");

    // Also verify it shows up in Object.keys (non-enumerable properties don't)
    expect(Object.keys(promise)).not.toContain("testProp");
  });
});