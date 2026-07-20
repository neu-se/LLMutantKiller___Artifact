import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should return a pending promise when given no value', () => {
        const promise = Q();
        expect(promise.inspect()).toEqual({ state: "pending" });
    });
});