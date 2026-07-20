import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nearer", () => {
    it("should return the fulfillment value of a fulfilled promise", () => {
        const promise = Q(10);
        const result = Q.nearer(promise);
        expect(result).toBe(10);
    });

    it("should return the original value if the promise is not fulfilled", () => {
        const promise = Q.defer().promise;
        const result = Q.nearer(promise);
        expect(result).toBe(promise);
    });
});