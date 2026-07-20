import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle array reduce with no initial value", () => {
        const array = [1, 2, 3];
        const callback = (basis, value) => basis + value;
        const result = Q(array_reduce)(array, callback);
        expect(result).resolves.toEqual(6);
    });
});