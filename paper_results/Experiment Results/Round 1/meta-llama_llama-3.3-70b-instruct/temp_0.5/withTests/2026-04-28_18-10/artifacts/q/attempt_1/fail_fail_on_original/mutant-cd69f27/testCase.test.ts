import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("SES support", () => {
    it("should not throw an error when ses is not defined", () => {
        // @ts-ignore
        global.ses = undefined;
        expect(() => Q()).not.toThrow();
    });

    it("should set ses.makeQ when ses is defined", () => {
        // @ts-ignore
        global.ses = { ok: () => true };
        const originalMakeQ = Q;
        Q();
        // @ts-ignore
        expect(global.ses.makeQ).toBe(originalMakeQ);
    });
});