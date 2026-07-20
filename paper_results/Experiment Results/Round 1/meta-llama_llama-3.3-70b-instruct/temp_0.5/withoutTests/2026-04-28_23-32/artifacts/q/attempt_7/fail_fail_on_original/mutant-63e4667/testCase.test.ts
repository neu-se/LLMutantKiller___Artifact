import { Q } from "./q";

describe('Q', () => {
    it('should return an empty array when calling keys on an empty object', () => {
        const promise = Q({});
        return promise.keys().then((keys: string[]) => {
            expect(keys).not.toContain("Stryker was here");
        });
    });
});