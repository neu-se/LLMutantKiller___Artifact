import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.join", () => {
    it("should return a promise that fulfills with the first value if they are the same, but the mutation should cause it to reject", () => {
        return Q.join(Q(1), Q(1)).then((value: number) => {
            expect(value).toBe(1);
        }, (error: any) => {
            expect(error).toBeUndefined();
        });
    });
});