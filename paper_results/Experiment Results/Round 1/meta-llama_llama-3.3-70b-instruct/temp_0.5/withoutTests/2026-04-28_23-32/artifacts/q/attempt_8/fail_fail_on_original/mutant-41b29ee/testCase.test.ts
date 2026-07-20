import { Q } from "./q.js";

describe("Q.all", () => {
    it("should not resolve with the original promises", () => {
        const promise1 = Q(1);
        const promise2 = Q(2);
        const promise3 = Q(3);

        return Q.all([promise1, promise2, promise3]).then((values) => {
            expect(values).not.toBe(promise1);
            expect(values).not.toBe(promise2);
            expect(values).not.toBe(promise3);
        });
    });
});