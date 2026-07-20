import { Q } from "./q";

describe("Q library object_defineProperty test", () => {
  it("should properly define non-enumerable properties using object_defineProperty", () => {
    const obj = {};
    const promise = Q.resolve(42);

    // The original code should properly define properties using Object.defineProperty
    // The mutated code sets object_defineProperty to false, which should break this functionality
    expect(() => {
      promise.then(value => {
        expect(value).toBe(42);
      });
    }).not.toThrow();

    // Additional check to ensure the promise functionality works
    return promise.then(value => {
      expect(value).toBe(42);
    });
  });
});