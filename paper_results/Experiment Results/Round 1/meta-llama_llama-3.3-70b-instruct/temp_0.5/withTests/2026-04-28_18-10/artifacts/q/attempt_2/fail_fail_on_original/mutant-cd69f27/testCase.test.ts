import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("SES support", () => {
    it("should set ses.makeQ when ses is defined and ok returns true", () => {
        // @ts-ignore
        global.ses = { ok: () => true, makeQ: null };
        Q();
        // @ts-ignore
        expect(global.ses.makeQ).toBeDefined();
    });

    it("should not set ses.makeQ when ses is defined and ok returns false", () => {
        // @ts-ignore
        global.ses = { ok: () => false, makeQ: null };
        Q();
        // @ts-ignore
        expect(global.ses.makeQ).toBeNull();
    });
});