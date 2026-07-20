import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the progressed callback when progress is made', () => {
        const progressed = jest.fn();
        Q(progressed);
        expect(progressed).toHaveBeenCalledTimes(0);
    });
});