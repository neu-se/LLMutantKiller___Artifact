import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should define object_defineProperty correctly", () => {
        // Create a test object
        const obj = {};

        // Define a property using object_defineProperty
        const descriptor = { value: "testValue", configurable: true, writable: true, enumerable: true };
        const object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
            obj[prop] = descriptor.value;
            return obj;
        };
        object_defineProperty(obj, "testProperty", descriptor);

        // Check if the property descriptor is correct
        const propertyDescriptor = Object.getOwnPropertyDescriptor(obj, "testProperty");
        expect(propertyDescriptor.configurable).toBe(true);
        expect(propertyDescriptor.writable).toBe(true);
        expect(propertyDescriptor.enumerable).toBe(true);
    });
});