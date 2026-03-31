import { test, expect } from '@playwright/test';

test('POST: Create a new hotel booking', async ({ request }) => 
{
    // The Data
    const bookingData = 
    {
        "firstname": "Aylin",
        "lastname": "Valencia",
        "totalprice": 150,
        "depositpaid": true,
        "bookingdates": 
        {
            "checkin": "2026-04-01",
            "checkout": "2026-04-05"
        },
        "additionalneeds": "Breakfast"
    };

    // The Request
    const response = await request.post('https://restful-booker.herokuapp.com/booking', 
    {
        data: bookingData
    });

    // The Status
    console.log(`📡 Status Code: ${response.status()}`);
    expect(response.status()).toBe(200);

    // The Validation
    const body = await response.json();
    console.log('📄 Created Booking Response:', body);

    expect(body.booking).toHaveProperty('firstname', 'Aylin');
    expect(body).toHaveProperty('bookingid');
});