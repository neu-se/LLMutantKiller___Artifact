import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const object = {};
        const name = "test";
        const args = [];

        const promise = q.npost(object, name, args);

        return promise.then((result) => {
            expect(args).toEqual([]);
        });
    });
});