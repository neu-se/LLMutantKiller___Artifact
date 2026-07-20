import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys", () => {
    it("should throw an error when Q.keys is not implemented", () => {
        const object = { a: 1, b: 2, c: 3 };
        expect(() => Q.keys(object)).toThrowError();
    });
});