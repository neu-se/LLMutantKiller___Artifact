import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should create a global Q object when executed as a script", () => {
        const originalQ = (globalThis as any).Q;
        delete (globalThis as any).Q;
        require("../../../../../../../../../../../subject_repositories/q/q");
        expect((globalThis as any).Q).toBeDefined();
        (globalThis as any).Q = originalQ;
    });
});