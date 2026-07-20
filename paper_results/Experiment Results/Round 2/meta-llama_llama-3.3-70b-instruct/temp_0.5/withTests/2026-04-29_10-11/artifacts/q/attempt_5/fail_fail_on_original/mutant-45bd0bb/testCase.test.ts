import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use Object.create if it exists", () => {
        // Arrange
        var originalCreate = Object.create;

        // Act
        var object = Q({});

        // Assert
        expect(Object.getPrototypeOf(object)).toBe(Object.prototype);
        Object.create = null;
        expect(function() { Q({}) }).toThrow();
        Object.create = originalCreate;
    });
});