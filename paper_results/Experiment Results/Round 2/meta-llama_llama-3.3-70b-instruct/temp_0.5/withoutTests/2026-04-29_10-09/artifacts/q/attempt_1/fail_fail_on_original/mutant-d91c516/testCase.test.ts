import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should dispatch "keys" when Q.keys is called', () => {
        const object = {
            dispatch: jest.fn(),
        };
        Q.keys(object);
        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).toHaveBeenCalledWith("keys", []);
    });
});