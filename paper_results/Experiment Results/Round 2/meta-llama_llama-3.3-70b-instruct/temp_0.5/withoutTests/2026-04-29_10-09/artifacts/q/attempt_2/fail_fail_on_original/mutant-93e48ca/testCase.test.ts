import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should call the post method with no name when the object has an apply method', () => {
        const object = {
            apply: jest.fn(),
        };

        const promise = Q.fulfill(object);
        promise.post(null, [1, 2, 3]);

        expect(object.apply).toHaveBeenCalledTimes(1);
        expect(object.apply).toHaveBeenCalledWith(void 0, [1, 2, 3]);
    });
});