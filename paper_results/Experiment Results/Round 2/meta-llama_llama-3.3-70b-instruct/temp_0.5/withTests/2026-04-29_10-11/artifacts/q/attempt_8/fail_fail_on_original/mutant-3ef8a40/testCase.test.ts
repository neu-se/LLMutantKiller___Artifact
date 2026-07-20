import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.join", () => {
    it("should return a promise that rejects if the values are not the same, but the original code should pass when they are the same", () => {
        return Q.join(Q(1), Q(1)).then((value: number) => {
            expect(value).toBe(1);
        });
    });
});