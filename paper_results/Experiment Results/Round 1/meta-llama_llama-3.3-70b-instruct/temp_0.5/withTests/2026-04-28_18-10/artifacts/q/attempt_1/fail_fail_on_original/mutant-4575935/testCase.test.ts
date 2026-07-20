import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q function", () => {
    it("should result in a fulfilled promise when given a value", async () => {
        const promise = Q(5);
        expect(promise.isFulfilled()).toBe(true);
    });
});