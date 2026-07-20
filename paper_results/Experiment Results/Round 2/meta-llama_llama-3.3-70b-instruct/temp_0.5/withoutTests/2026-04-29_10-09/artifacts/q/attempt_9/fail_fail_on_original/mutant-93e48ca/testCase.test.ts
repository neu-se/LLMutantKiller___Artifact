import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should not call the apply method when name is null in the mutated code', () => {
        const object = {
            post: jest.fn(),
            apply: jest.fn(),
        };

        const promise = Q.fulfill(object);
        promise.post(null, [1, 2, 3]);

        expect(object.apply).toHaveBeenCalledTimes(0);
    });
});