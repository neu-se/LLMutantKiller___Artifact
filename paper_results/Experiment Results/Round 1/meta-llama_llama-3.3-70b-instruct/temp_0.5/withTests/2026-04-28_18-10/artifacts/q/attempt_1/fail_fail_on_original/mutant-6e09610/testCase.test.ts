import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const promise = Q.delay(10).thenResolve("test");
        return promise.then((value) => {
            expect(value).toBe("test");
        });
    });
});