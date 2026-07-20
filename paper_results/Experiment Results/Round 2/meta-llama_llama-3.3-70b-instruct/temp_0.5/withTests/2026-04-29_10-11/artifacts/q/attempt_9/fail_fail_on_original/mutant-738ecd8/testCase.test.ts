import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.join", () => {
    it("should check the behavior of Q.join", () => {
        var promise1 = Q(1);
        var promise2 = Q(1);
        return promise1.join(promise2).then((result: any) => {
            expect(result).toBe(1);
        });
    });
});