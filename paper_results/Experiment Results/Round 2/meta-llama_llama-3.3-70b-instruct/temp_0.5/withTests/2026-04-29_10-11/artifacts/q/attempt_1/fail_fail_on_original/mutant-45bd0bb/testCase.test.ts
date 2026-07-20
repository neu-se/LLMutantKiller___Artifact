import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create an object with Object.create if available", () => {
        // Arrange
        const object = {};
        const prototype = {};

        // Act
        const result = Q(object_create)(prototype);

        // Assert
        expect(result).toBeInstanceOf(Object);
        expect(Object.getPrototypeOf(result)).toBe(prototype);
    });
});

function object_create(prototype: any) {
    if (Object.create) {
        return Object.create(prototype);
    } else {
        function Type() { }
        Type.prototype = prototype;
        return new Type();
    }
}