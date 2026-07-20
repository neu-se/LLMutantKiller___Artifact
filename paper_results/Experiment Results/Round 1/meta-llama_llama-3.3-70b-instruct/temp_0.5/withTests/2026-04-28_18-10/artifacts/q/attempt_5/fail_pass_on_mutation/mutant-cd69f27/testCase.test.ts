import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("SES support", () => {
    it("should set ses.makeQ when ses is defined and ok returns true", () => {
        // @ts-ignore
        global.ses = { ok: () => true, makeQ: null };
        q.default();
        // @ts-ignore
        expect(global.ses.makeQ).toBeDefined();
    });

    it("should not set ses.makeQ when ses is defined but ok is not a function", () => {
        // @ts-ignore
        global.ses = { makeQ: null };
        q.default();
        // @ts-ignore
        expect(global.ses.makeQ).toBeNull();
    });
});