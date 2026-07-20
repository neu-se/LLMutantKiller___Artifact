import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should check if object_create is defined with Object.create and is a function", () => {
        // Arrange
        var object_create = Object.create || function (prototype) {
            function Type() { }
            Type.prototype = prototype;
            return new Type();
        };

        // Act and Assert
        expect(Object.create).toBeDefined();
        expect(typeof Object.create).toBe('function');
    });
});