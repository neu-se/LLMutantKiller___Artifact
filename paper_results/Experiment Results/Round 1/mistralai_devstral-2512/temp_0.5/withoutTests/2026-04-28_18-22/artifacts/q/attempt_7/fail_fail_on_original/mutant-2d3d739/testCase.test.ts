const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty test", () => {
  it("should use object_defineProperty to define properties", () => {
    // Test that object_defineProperty is actually a function in the original code
    // This will fail in the mutated version where it's set to false

    // Access the internal implementation
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const internalDef = qModule.__internal__.object_defineProperty;

    expect(typeof internalDef).toBe('function');

    // Test that it actually works by defining a property
    const testObj = {};
    internalDef(testObj, 'testProp', {
      value: 42,
      enumerable: false,
      configurable: true,
      writable: true
    });

    expect(testObj.testProp).toBe(42);
    expect(Object.keys(testObj)).not.toContain('testProp');
  });
});