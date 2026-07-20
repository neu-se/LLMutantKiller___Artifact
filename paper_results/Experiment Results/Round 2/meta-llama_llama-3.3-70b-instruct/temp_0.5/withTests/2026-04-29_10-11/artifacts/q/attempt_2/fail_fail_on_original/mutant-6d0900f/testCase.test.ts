import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection reporting", () => {
    it("should report a rejection", () => {
        Q.reject("reason");
        expect(Q.getUnhandledReasons().length).toBe(1);
    });
});