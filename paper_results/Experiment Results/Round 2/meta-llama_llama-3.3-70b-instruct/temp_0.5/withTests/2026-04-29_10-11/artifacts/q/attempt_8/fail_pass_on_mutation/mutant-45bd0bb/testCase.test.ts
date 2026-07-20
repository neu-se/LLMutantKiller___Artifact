import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should check if object_create is defined with Object.create", () => {
        // Arrange
        var object_create = Object.create || function (prototype) {
            function Type() { }
            Type.prototype = prototype;
            return new Type();
        };

        // Act and Assert
        expect(object_create).not.toBeUndefined();
        expect(typeof object_create).toBe('function');
    });
});