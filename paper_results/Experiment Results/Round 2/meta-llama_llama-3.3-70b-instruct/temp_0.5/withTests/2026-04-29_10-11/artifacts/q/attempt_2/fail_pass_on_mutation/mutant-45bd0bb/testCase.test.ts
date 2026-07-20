import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create an object with Object.create if available", () => {
        // Arrange
        var object_create = Object.create || function (prototype) {
            function Type() { }
            Type.prototype = prototype;
            return new Type();
        };

        // Act
        var result = object_create({});

        // Assert
        expect(Object.getPrototypeOf(result)).toEqual({});
    });

    it.skip("should not create an object with Object.create if not available and function is truthy", () => {
        // Arrange
        var object_create = Object.create && function (prototype) {
            function Type() {}
            Type.prototype = prototype;
            return new Type();
        };

        // Act and Assert
        expect(object_create).toBeUndefined();
    });
});