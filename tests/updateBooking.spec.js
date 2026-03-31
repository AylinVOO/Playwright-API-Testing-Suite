import { test, expect } from '@playwright/test';

test('PUT: Update an existing booking', async ({ request }) => 
{
    // Get a token first
    const auth = await request.post('https://restful-booker.herokuapp.com/auth', 
    {
        data: 
        { 
            username: 'admin', 
            password: 'password123' 
        }
    });
    const { token } = await auth.json();

    // Find an active ID 
    const allBookings = await request.get('https://restful-booker.herokuapp.com/booking');
    const ids = await allBookings.json();
    const targetId = ids[0].bookingid;

    // Update the record using the token and ID found
    const response = await request.put(`https://restful-booker.herokuapp.com/booking/${targetId}`, 
    {
        headers: 
        {
            'Cookie': `token=${token}`,
            'Accept': 'application/json'
        },
        data: 
        {
            firstname: 'Aylin',
            lastname: 'Valencia',
            totalprice: 200,
            depositpaid: true,
            bookingdates: 
            { 
                checkin: '2026-04-01', checkout: '2026-04-05' 
            },
            additionalneeds: 'Breakfast'
        }
    });

    console.log(`Update Status for ID ${targetId}: ${response.status()}`);
    expect(response.status()).toBe(200);
});