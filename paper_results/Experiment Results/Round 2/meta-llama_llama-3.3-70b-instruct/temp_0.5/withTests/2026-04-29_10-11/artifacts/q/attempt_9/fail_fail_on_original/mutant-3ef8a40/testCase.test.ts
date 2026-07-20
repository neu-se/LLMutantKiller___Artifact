import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.join", () => {
    it("should return a promise that fulfills with the first value if they are the same", () => {
        return Q.join(Q(1), Q(1)).then((value) => {
            expect(value).toBe(1);
        });
    });
});