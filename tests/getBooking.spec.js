import { test, expect } from '@playwright/test';

test('GET: Retrieve a specific booking by ID', async ({ request }) => 
{
    // Get ALL bookings first to find a valid ID that exists right now
    const allBookings = await request.get('https://restful-booker.herokuapp.com/booking');
    const ids = await allBookings.json();
    
    // Pick the first ID from the list to ensure the test never hits a 404
    const targetId = ids[0].bookingid; 

    // THE ENDPOINT: Use the dynamic ID we just found
    const response = await request.get(`https://restful-booker.herokuapp.com/booking/${targetId}`);

    // THE STATUS: A successful GET should return "200 OK"
    console.log(`Testing ID: ${targetId} | Status Code: ${response.status()}`);
    expect(response.status()).toBe(200);

    // THE BODY: Show the details of the booking retrieved
    const body = await response.json();
    console.log('Booking Details:', body);

    // VALIDATION: Check that the response has the expected properties
    expect(body).toHaveProperty('firstname');
    expect(body).toHaveProperty('lastname');
});