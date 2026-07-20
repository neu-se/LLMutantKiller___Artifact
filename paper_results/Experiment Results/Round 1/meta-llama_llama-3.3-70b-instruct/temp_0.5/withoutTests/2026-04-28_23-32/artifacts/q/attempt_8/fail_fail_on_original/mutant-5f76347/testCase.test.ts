import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should dispatch delete operation with the correct key', () => {
        const dispatchSpy = jest.fn();
        const object = { dispatch: dispatchSpy };
        Q(object).del('foo');
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith('delete', ['foo']);
    });
});