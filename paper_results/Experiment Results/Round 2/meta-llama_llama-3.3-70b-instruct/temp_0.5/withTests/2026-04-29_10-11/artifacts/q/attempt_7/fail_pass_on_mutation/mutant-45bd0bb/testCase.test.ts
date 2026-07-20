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
        var obj = object_create({});

        // Assert
        expect(Object.getPrototypeOf(obj)).toEqual(Object.prototype);
    });
});