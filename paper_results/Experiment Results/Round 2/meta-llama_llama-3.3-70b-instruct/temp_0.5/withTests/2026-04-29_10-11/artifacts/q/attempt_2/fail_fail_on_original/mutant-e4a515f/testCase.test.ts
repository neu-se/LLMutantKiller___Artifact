import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should not call the resolver function immediately", () => {
        let called = false;
        Q((resolve: any) => {
            called = true;
            resolve();
        });
        expect(called).toBe(false);
    });
});