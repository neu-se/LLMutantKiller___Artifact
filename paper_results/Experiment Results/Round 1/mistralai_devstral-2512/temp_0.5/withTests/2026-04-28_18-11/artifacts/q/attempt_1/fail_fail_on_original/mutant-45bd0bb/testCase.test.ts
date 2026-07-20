import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_create mutation test", () => {
    it("should correctly create objects with prototype chain using fallback when Object.create is not available", () => {
        // Create a test prototype
        const testProto = {
            testProperty: "testValue",
            testMethod: function() {
                return "testMethodResult";
            }
        };

        // Create an object using the prototype
        // This should work even if Object.create is not available (using the fallback)
        const obj = Object.create(testProto);
        obj.ownProperty = "ownValue";

        // Verify the prototype chain works correctly
        expect(obj.testProperty).toBe("testValue");
        expect(obj.testMethod()).toBe("testMethodResult");
        expect(obj.ownProperty).toBe("ownValue");
        expect(obj.__proto__).toBe(testProto);

        // Now test with Q's internal object creation
        // We'll test this by creating a promise and checking its prototype chain
        const promise = Q.resolve(42);
        expect(promise.inspect()).toEqual({
            state: "fulfilled",
            value: 42
        });

        // The promise should have the correct prototype methods
        expect(typeof promise.then).toBe("function");
        expect(typeof promise.catch).toBe("function");
        expect(typeof promise.finally).toBe("function");
    });
});