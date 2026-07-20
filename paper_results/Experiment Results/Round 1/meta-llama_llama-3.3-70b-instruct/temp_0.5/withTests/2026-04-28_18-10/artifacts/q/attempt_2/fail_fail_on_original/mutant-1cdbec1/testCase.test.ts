import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should create a global Q object", () => {
        const globalObject = typeof window!== "undefined"? window : global;
        expect(globalObject.Q).toBeDefined();
    });
});