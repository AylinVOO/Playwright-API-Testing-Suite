import { test, expect } from '@playwright/test';

test('DELETE: Remove a booking from the system', async ({ request }) => 
{
    // 1. LOGIN: Get the token first
    const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', 
    {
        data: 
        { 
            "username": "admin", 
            "password": "password123" 
        }
    });
    const { token } = await authResponse.json();

    // 2. THE REQUEST: Delete a specific ID 
    const response = await request.delete('https://restful-booker.herokuapp.com/booking/1', 
    {
        headers: 
        {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`
        }
    });

    // 3. VALIDATION: A successful delete should return "200 OK" or "201 Created"
    console.log(`Status Code: ${response.status()}`);
    expect(response.status()).toBe(201); 
    
    // 4. VERIFY: Try to GET the same booking to confirm it's gone
    const verify = await request.get('https://restful-booker.herokuapp.com/booking/1');
    expect(verify.status()).toBe(404);
    console.log('🗑️ Booking successfully deleted and verified.');
});