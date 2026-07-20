import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const object = {};
        const name = "test";
        const args: any[] = [];

        const promise = q.npost(object, name, args);

        return promise.then((result: any) => {
            expect(args).toEqual([]);
        });
    });
});