import { test, expect } from '@playwright/test';

test('PUT: Update an existing booking with Auth', async ({ request }) => 
{
    
    // 1. GET THE TOKEN (The Login)
    const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', 
    {
        data: 
        { 
            "username": "admin", 
            "password": "password123" 
        }
    });
    const authBody = await authResponse.json();
    const token = authBody.token;

    // 2. THE DATA: Change the total price and additional needs for the booking
    const updatedData = 
    {
        "firstname": "Aylin",
        "lastname": "Valencia",
        "totalprice": 200, 
        "depositpaid": true,
        "bookingdates": 
        { 
            "checkin": "2026-04-01", 
            "checkout": "2026-04-05" 
        },
        "additionalneeds": "Late Checkout"
    };

    // 3. THE REQUEST: Use .put() to update the booking with ID 1
    const response = await request.put('https://restful-booker.herokuapp.com/booking/1', 
    {
        headers: 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}` // Token is sent as a cookie for authentication in this API
        },
        data: updatedData
    });

    // 4. VALIDATION
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log('✅ Updated Record:', body);
    expect(body.totalprice).toBe(200);
    expect(body.additionalneeds).toBe('Late Checkout');
});