import { UserRequest } from '../../src/@types/UserRequest';
import { validate } from 'class-validator';

describe('User Request', () => {

    it('should return email syntax error', async () => {
        const user: UserRequest = {
            name: 'John',
            email: 'test',
            password: 'test1213',
            user_type_id: 'cdba1288-ab0f-49b0-953c-ed9df7a1f340'
        };
        const user_request = new UserRequest(
            user
        );
        const errors = await validate(user_request);
        expect(errors.length).toBe(1);
    })

    it('should return password syntax error', async () => {
        const user: UserRequest = {
            name: 'John',
            email: 'test@gmail.com',
            password: 'test1',
            user_type_id: 'cdba1288-ab0f-49b0-953c-ed9df7a1f340'
        };
        const user_request = new UserRequest(
            user
        );
        const errors = await validate(user_request);
        expect(errors.length).toBe(1);
    })
    
    it('should return user_type_id syntax error', async () => {
        const user: UserRequest = {
            name: 'John',
            email: 'test@gmail.com',
            password: 'test1234',
            user_type_id: 'cdba1288-ab0f-49b0-953c-ed9df7a1f3-0'
        };
        const user_request = new UserRequest(
            user
        );
        const errors = await validate(user_request);
        expect(errors.length).toBe(1);
    })
})
