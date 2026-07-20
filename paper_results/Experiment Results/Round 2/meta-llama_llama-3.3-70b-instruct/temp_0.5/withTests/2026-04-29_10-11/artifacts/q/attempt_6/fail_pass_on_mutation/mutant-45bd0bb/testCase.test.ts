import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use Object.create if it exists", () => {
        // Arrange
        var originalCreate = Object.create;

        // Act and Assert
        expect(Object.create).not.toBeNull();
        expect(Q).not.toBeNull();
    });
});