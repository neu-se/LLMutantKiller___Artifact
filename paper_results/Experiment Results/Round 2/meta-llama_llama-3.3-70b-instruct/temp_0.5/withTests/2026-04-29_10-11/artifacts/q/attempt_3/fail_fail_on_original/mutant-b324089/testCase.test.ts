import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("nearer function", () => {
    it("should return the inspected value of a fulfilled promise", () => {
        const promise = Q(5);
        return Q.nearer(promise).then((value: any) => {
            expect(value).toBe(5);
        });
    });
});