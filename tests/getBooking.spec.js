import { test, expect } from '@playwright/test';

test('GET: Retrieve a specific booking by ID', async ({ request }) => 
{
    
    // THE ENDPOINT: We want to get the details of Booking #1
    const response = await request.get('https://restful-booker.herokuapp.com/booking/1');

    // THE STATUS: A successful GET should return "200 OK"
    console.log(`📡 HTTP Status Code: ${response.status()}`);
    expect(response.status()).toBe(200);

    // THE BODY: Show the details of the booking retrieved
    const body = await response.json();
    console.log('📄 Booking Details:', body);

    // VALIDATION: Check that the response has the expected properties
    expect(body).toHaveProperty('firstname');
    expect(body).toHaveProperty('lastname');
});