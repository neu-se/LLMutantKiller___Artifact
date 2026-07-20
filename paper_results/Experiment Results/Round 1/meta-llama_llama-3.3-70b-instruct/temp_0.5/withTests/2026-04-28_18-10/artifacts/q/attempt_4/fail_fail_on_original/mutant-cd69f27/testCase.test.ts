import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("SES support", () => {
    it("should throw an error when ses is defined but ok is not a function", () => {
        // @ts-ignore
        global.ses = { makeQ: null };
        expect(() => q.default()).toThrowError();
    });
});