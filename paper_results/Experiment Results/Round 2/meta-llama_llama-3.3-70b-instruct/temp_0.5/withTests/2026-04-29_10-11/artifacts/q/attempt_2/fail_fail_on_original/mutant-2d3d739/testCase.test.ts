import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should create a promise with object_defineProperty", () => {
    // Set object_defineProperty to a function that defines properties
    const originalObjectDefineProperty = Object.defineProperty;
    Object.defineProperty = function (obj, prop, descriptor) {
      obj[prop] = descriptor.value;
      return obj;
    };

    // Create a promise
    const promise = Q(10);

    // Restore the original object_defineProperty
    Object.defineProperty = originalObjectDefineProperty;

    // Check if the promise is fulfilled
    expect(promise.isFulfilled()).toBe(true);
  });
});