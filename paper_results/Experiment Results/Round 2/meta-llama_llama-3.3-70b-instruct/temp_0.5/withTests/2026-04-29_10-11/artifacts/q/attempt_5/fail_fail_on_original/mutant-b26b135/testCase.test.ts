import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return the keys of an object", () => {
        const obj = { a: 1, b: 2 };
        const spy = jest.spyOn(Q(obj), 'keys');
        Q(obj).keys();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});