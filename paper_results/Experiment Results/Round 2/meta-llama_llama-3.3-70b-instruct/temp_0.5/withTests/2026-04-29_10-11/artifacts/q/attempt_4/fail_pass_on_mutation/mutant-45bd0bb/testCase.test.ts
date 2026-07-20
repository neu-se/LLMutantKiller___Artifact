import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create an object with Object.create if available and assign it a property", () => {
        // Arrange
        var object_create = Object.create || function (prototype) {
            function Type() { }
            Type.prototype = prototype;
            return new Type();
        };

        // Act
        var obj = object_create({});
        obj.test = "test";

        // Assert
        expect(obj.test).toBe("test");
    });

    it("should not create an object with Object.create if not available", () => {
        // Arrange
        var object_create = Object.create && function (prototype) {
            throw new Error("Object.create is not available");
        };

        // Act and Assert
        expect(() => object_create({})).toThrowError("Object.create is not available");
    });
});