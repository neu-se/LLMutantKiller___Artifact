import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should throw an error when the promises are not the same", () => {
        return Q(1).join(Q(2)).then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe("Q can't join: not the same: 1 2");
        });
    });
});