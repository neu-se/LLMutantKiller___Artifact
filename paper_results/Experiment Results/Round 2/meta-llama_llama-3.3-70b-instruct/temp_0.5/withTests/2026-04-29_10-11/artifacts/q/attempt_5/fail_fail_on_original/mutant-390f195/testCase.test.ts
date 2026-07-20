import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should correctly handle the mutation", () => {
        const error = new Error();
        const p = { stack: "test stack", stackCounter: 10 };
        const originalMakeStackTraceLong = Q.makeStackTraceLong;
        Q.makeStackTraceLong = function(error, promise) {
            originalMakeStackTraceLong(error, promise);
            expect(error.__minimumStackCounter__).toBeDefined();
        };
        Q.makeStackTraceLong(error, p);
    });
});