import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection reporting", () => {
    it("should report a rejection", () => {
        q.reject("reason");
        expect(q.getUnhandledReasons().length).toBe(1);
    });
});