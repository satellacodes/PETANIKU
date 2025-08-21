const { exec } = require('child_process');
const dotenv = require('dotenv');
dotenv.config();

const maxRetries = 10;
let retries = 0;

function testDbConnection() {
  const cmd = `PGPASSWORD=${process.env.DB_PASSWORD} psql -h ${process.env.DB_HOST} -p ${process.env.DB_PORT} -U ${process.env.DB_USER} -d ${process.env.DB_NAME} -c "SELECT 1"`;
  
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      retries++;
      console.log(`Database connection failed (attempt ${retries}/${maxRetries})`);
      
      if (retries < maxRetries) {
        setTimeout(testDbConnection, 5000);
      } else {
        console.error('Unable to connect to database after multiple attempts');
        process.exit(1);
      }
    } else {
      console.log('Database is ready!');
      process.exit(0);
    }
  });
}

console.log('Waiting for database to be ready...');
testDbConnection();
