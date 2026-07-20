import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return an array that does not contain "Stryker was here" when getting keys of an object', async () => {
        const object = { a: 1, b: 2, c: 3 };
        const promise = Q(object).keys();
        const keys = await promise;
        expect(keys).not.toContain("Stryker was here");
    });
});