const faker = require('faker');
const fs = require('fs');

const users = [];

for (let i = 0; i < 10; i++) {
  const user = {
    name: faker.name.findName(),
    googleId: faker.random.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    avatar: `https://i.pravatar.cc/150?img=${i+1}` // Using pravatar.cc to generate random avatars
  };
  users.push(user);
}

fs.writeFileSync(__dirname+'dummy-users.json', JSON.stringify(users, null, 2));
console.log('Dummy users generated successfully!');
