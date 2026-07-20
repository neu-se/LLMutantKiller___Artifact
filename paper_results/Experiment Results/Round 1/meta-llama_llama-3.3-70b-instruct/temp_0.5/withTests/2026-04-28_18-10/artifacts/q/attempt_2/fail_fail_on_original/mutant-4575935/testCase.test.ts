import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q function", () => {
    it("should attach Q to the global object", async () => {
        const global = typeof window !== "undefined" ? window : self;
        expect(global.Q).toBeDefined();
    });
});