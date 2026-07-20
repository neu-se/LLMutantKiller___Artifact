import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should reject when any promise is rejected and handle pending promises", () => {
        const promise1 = Q.defer().promise;
        const promise2 = Q.reject("Error");
        const promise3 = Q(3);

        Q.nextTick(() => {
            promise1.resolve(1);
        });

        return Q.all([promise1, promise2, promise3]).then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error).toBe("Error");
        });
    });
});