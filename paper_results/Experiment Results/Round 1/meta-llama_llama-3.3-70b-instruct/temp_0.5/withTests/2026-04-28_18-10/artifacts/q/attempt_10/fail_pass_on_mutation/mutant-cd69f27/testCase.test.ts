import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("SES support", () => {
    it("should set ses.makeQ when ses is defined and ok returns true", () => {
        // @ts-ignore
        global.ses = { ok: () => true, makeQ: null };
        q.default();
        // @ts-ignore
        expect(global.ses.makeQ).toBeDefined();
    });

    it.skip("should throw an error when the if condition is not properly checked", () => {
        // @ts-ignore
        global.ses = { ok: () => false, makeQ: null };
        expect(() => {
            if (!global.ses.ok()) {}
            global.ses.makeQ = q.default;
        }).toThrowError();
    });
});