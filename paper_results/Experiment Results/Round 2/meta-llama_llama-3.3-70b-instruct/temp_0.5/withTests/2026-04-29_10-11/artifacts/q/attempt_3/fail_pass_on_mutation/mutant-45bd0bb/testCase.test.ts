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

    it.skip("should throw an error when trying to create an object with Object.create if it's not a function", () => {
        // Arrange
        var object_create = Object.create && function (prototype) {
            function Type() {}
            Type.prototype = prototype;
            return new Type();
        };

        // Act and Assert
        expect(() => object_create({})).toThrowError();
    });
});