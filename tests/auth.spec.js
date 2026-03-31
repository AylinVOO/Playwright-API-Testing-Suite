import { test, expect } from '@playwright/test';

test('POST: Generate Auth Token', async ({ request }) => 
{
    const response = await request.post('https://restful-booker.herokuapp.com/auth', 
    {
        data: 
        {
            username: process.env.ADMIN_USER || 'admin',
            password: process.env.ADMIN_PASSWORD || 'password123'
        }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // Token that will be used for authenticated requests (like updating or deleting bookings). 
    console.log('🗝️ Your Security Token:', body.token);
    expect(body).toHaveProperty('token');
});