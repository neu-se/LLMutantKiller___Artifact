import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("SES support", () => {
    it("should set ses.makeQ when ses is defined and ok returns true", () => {
        // @ts-ignore
        global.ses = { ok: () => true, makeQ: null };
        q.default();
        // @ts-ignore
        expect(global.ses.makeQ).toBeDefined();
    });

    it("should not set ses.makeQ when ses is defined and ok returns false, but should not enter the if condition", () => {
        // @ts-ignore
        global.ses = { ok: () => false, makeQ: null, enteredIf: false };
        // @ts-ignore
        if (global.ses.ok()) {
            global.ses.enteredIf = true;
            global.ses.makeQ = q.default;
        }
        expect(global.ses.enteredIf).toBe(false);
        // @ts-ignore
        expect(global.ses.makeQ).toBeNull();
    });
});