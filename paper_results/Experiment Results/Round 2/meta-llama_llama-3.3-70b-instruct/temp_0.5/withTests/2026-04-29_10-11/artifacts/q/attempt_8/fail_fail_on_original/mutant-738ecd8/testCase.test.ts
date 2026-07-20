import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should check the behavior of Q.join", () => {
        var promise1 = Q(1);
        var promise2 = Q(1);
        return Q.join(promise1, promise2).then((result: any) => {
            expect(result).toBe(1);
        });
    });

    it("should throw an error when the promises are not the same", () => {
        var promise1 = Q(1);
        var promise2 = Q(2);
        return Q.join(promise1, promise2).then((result: any) => {
            expect(true).toBe(false);
        }).catch((error: any) => {
            expect(error.message).toBe("Q can't join: not the same: 1 2");
        });
    });
});