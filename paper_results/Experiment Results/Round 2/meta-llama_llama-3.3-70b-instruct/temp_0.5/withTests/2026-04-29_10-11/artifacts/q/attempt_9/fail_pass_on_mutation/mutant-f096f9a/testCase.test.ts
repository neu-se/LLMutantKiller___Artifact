import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should throw an error when Q.any is called with no arguments", () => {
        expect(() => Q.any()).toThrowError();
    });

    it.skip("should return a promise that resolves to undefined when Q.any is called with an empty array", () => {
        const promise = Q.any([]);
        return promise.then((value: any) => {
            expect(value).toBeUndefined();
        });
    });
});