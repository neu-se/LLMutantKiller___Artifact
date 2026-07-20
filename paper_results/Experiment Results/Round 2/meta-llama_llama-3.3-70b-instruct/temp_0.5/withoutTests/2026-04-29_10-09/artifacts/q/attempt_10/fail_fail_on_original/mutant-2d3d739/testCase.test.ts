describe("Q", () => {
    it("should define properties using Object.defineProperty", () => {
        const Q = require("../../../../../../../../subject_repositories/q/q");
        expect(typeof Q.object_defineProperty).toBe("function");
    });
});