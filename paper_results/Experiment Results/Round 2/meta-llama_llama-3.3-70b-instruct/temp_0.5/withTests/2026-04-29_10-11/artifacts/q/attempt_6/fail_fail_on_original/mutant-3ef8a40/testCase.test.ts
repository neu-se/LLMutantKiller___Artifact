import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.join", () => {
    it("should return a promise that rejects if the values are the same", () => {
        return Q.join(Q(1), Q(1)).then(null, (error: any) => {
            expect(error.message).toBe("Q can't join: not the same: 1 1");
        });
    });
});