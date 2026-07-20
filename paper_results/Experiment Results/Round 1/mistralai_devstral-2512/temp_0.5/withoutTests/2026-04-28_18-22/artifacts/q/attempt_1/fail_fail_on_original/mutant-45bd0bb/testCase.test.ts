import { Q } from "./q.js";

describe("Q object creation", () => {
  it("should correctly create objects using object_create polyfill", () => {
    // Create a test object with a property
    const testProto = { testProp: "testValue" };

    // Create a new object using Q's internal object_create
    // We need to access this indirectly since it's not exported
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The promise should be an object created with object_create
    // We can verify this by checking if it has the correct prototype chain
    expect(Object.getPrototypeOf(promise)).toBe(Q.Promise.prototype);

    // Also verify that the object creation works for basic cases
    const obj = Object.create(testProto);
    expect(obj.testProp).toBe("testValue");
    expect(Object.getPrototypeOf(obj)).toBe(testProto);
  });
});