import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("SES support", () => {
    it("should throw an error when ses is defined but ok is not a function and an empty if block is present", () => {
        // @ts-ignore
        global.ses = { makeQ: null };
        expect(() => {
            if (global.ses.ok()) {}
        }).toThrowError();
    });
});