import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should create a global Q object when executed as a script", () => {
        const originalQ = globalThis.Q;
        delete globalThis.Q;
        const q = require("../../../../../../../../../../../subject_repositories/q/q");
        expect(globalThis.Q).toBeDefined();
        globalThis.Q = originalQ;
    });
});