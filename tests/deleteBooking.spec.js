import { test, expect } from '@playwright/test';

test('DELETE: Remove a booking from the system', async ({ request }) => 
{
    // Get token
    const auth = await request.post('https://restful-booker.herokuapp.com/auth', 
    {
        data: 
        { 
            username: 'admin', 
            password: 'password123' 
        }
    });
    const { token } = await auth.json();

    // Find an active ID to delete
    const allBookings = await request.get('https://restful-booker.herokuapp.com/booking');
    const ids = await allBookings.json();
    const targetId = ids[0].bookingid;

    // Delete it
    const response = await request.delete(`https://restful-booker.herokuapp.com/booking/${targetId}`, 
    {
        headers: 
        {
            'Cookie': `token=${token}`
        }
    });

    console.log(`Delete Status for ID ${targetId}: ${response.status()}`);
    // This API returns 201 for a successful delete
    expect(response.status()).toBe(201); 
});