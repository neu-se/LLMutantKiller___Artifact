import { Q } from "./q.js";

describe("Q.all", () => {
    it("should reject with an error when one of the promises is pending", () => {
        const promise1 = Q.resolve(1);
        const promise2 = new Q((resolve, reject) => {});
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).catch((error) => {
            expect(error).toBeDefined();
        });
    });
});