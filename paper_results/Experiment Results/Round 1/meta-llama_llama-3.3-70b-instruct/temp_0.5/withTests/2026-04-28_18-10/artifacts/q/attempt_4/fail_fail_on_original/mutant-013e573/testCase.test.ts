import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const object = {};
        const name = "test";
        const args: any[] = [];

        const promise = q(object).npost(name, args);

        return promise.then((result: any) => {
            expect(args).toEqual([]);
        });
    });
});