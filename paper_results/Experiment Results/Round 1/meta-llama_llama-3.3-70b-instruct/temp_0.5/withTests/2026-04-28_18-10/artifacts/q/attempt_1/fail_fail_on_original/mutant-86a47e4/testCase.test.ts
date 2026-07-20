import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q function", () => {
    it("should result in a fulfilled promise when given a value", () => {
        expect(Q(5).isFulfilled()).toBe(true);
    });
});