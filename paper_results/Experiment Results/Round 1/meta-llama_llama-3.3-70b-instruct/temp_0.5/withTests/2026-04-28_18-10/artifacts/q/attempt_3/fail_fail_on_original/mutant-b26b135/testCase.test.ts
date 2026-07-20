import Q from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return keys of an object', async () => {
        const obj = { a: 1, b: 2 };
        const keys = await Q(obj).keys();
        expect(keys).toEqual(['a', 'b']);
    });
});