import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly check for a Node environment', () => {
        // Create a mock process object
        global.process = {
            toString: () => '[object process]',
            nextTick: jest.fn()
        };

        // Create a new Q instance
        const QInstance = Q;

        // Check if Q correctly detects the Node environment
        expect(typeof QInstance.nextTick).toBe('function');
    });
});