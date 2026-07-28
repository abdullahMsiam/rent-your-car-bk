import app from './app.js';
import config from './config/index.js';

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`🚀 RentNest Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Server failed to start:', err);
  }
}

main();