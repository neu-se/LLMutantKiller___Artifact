import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const object = {};
        const name = "test";
        const args = ["Stryker was here"];

        const promise = Q.npost(object, name, args);

        return promise.then((result) => {
            expect(result).toBeUndefined();
        });
    });
});