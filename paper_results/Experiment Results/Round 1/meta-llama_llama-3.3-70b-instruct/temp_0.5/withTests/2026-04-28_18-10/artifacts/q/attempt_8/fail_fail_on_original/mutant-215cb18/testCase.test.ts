import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should define object_defineProperty correctly", () => {
        // Create a test object
        const obj = {};

        // Define a property using object_defineProperty
        const descriptor = { value: "testValue" };
        const object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
            obj[prop] = descriptor.value;
            return obj;
        };
        object_defineProperty(obj, "testProperty", descriptor);

        // Check if the property is defined
        expect(obj.testProperty).toBe("testValue");

        // Check if the property is configurable
        const descriptorResult = Object.getOwnPropertyDescriptor(obj, "testProperty");
        expect(descriptorResult).toHaveProperty("value", "testValue");
        expect(descriptorResult).toHaveProperty("writable", true);
        expect(descriptorResult).toHaveProperty("enumerable", true);
        expect(descriptorResult).toHaveProperty("configurable", true);
    });
});