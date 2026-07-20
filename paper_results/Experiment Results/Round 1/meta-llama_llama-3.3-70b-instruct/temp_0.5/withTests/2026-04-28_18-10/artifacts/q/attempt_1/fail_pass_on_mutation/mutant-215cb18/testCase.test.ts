import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should define object_defineProperty correctly", () => {
        // Create a test object
        const obj = {};

        // Define a property using object_defineProperty
        const descriptor = { value: "testValue", configurable: true };
        const object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
            obj[prop] = descriptor.value;
            return obj;
        };
        object_defineProperty(obj, "testProperty", descriptor);

        // Check if the property is defined correctly
        expect(obj.testProperty).toBe("testValue");

        // Try to redefine the property
        const newDescriptor = { value: "newValue" };
        object_defineProperty(obj, "testProperty", newDescriptor);

        // Check if the property is updated correctly
        expect(obj.testProperty).toBe("newValue");
    });
});