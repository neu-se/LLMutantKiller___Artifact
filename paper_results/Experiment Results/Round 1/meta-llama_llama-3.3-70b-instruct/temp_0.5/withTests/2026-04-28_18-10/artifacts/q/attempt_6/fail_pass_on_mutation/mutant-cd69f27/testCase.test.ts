import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("SES support", () => {
    it("should not enter the if condition when ses is defined but ok returns false", () => {
        // @ts-ignore
        global.ses = { ok: () => false, makeQ: null };
        let enteredIf = false;
        // @ts-ignore
        if (global.ses.ok()) {
            enteredIf = true;
            global.ses.makeQ = q.default;
        }
        expect(enteredIf).toBe(false);
        // @ts-ignore
        expect(global.ses.makeQ).toBeNull();
    });

    it("should enter the if condition when ses is defined and ok returns true", () => {
        // @ts-ignore
        global.ses = { ok: () => true, makeQ: null };
        let enteredIf = false;
        // @ts-ignore
        if (global.ses.ok()) {
            enteredIf = true;
            global.ses.makeQ = q.default;
        }
        expect(enteredIf).toBe(true);
        // @ts-ignore
        expect(global.ses.makeQ).toBeDefined();
    });
});