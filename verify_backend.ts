import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const USER_ID = 'user_test_1';
const PRODUCT_ID = 'sku_1';

async function runTests() {
  try {
    console.log('--- 1. Checking Health ---');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('Health:', health.data);

    console.log('\n--- 2. Reserving Item ---');
    const reserve = await axios.post(`${BASE_URL}/cart/reserve`, {
      userId: USER_ID,
      productId: PRODUCT_ID,
    });
    console.log('Reserved:', reserve.data);

    console.log('\n--- 3. Getting Cart ---');
    const cart = await axios.get(`${BASE_URL}/cart`, {
      params: { userId: USER_ID },
    });
    console.log('Cart:', JSON.stringify(cart.data, null, 2));

    console.log('\n--- 4. Attempting to reserve out of stock (if applicable) ---');
    // Implementation specific: loop to drain stock if needed, or just reserve another
    const reserve2 = await axios.post(`${BASE_URL}/cart/reserve`, {
        userId: USER_ID,
        productId: PRODUCT_ID,
      });
    console.log('Reserved 2nd item:', reserve2.data);
    
    console.log('\n--- Done ---');
  } catch (error: any) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Allow time for server to start if running immediately after
setTimeout(runTests, 2000);
