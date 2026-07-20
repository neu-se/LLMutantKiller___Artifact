import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should resolve a promise with a value', () => {
        const promise = Q(5);
        let resolvedValue: any;
        promise.then((value) => {
            resolvedValue = value;
        });
        expect(resolvedValue).toBe(5);
    });
});