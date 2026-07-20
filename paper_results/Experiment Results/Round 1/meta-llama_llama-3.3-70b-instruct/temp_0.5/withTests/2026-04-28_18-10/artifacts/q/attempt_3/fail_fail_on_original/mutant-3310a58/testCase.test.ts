import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when Q.longStackSupport is set to true without Q_DEBUG", () => {
        // Act and Assert
        expect(() => {
            Q.longStackSupport = true;
        }).toThrowError("Q.longStackSupport can only be enabled when Q_DEBUG is set");
    });
});