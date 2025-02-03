const { faker, Faker, fa, fakerAZ } = require("@faker-js/faker");

let randomValues = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address : faker.location.streetAddress(),
    phone: faker.number.int({ min: 10, max: 100 }),
    email : `${faker.internet.email({ provider: 'example.dev', allowSpecialCharacters: false })}`,
    nickname : faker.person.middleName(),
    password: faker.internet.password({ length: 10, memorable: true, pattern: /[A-Z]/ }),
    relation : faker.helpers.arrayElement(['Family', 'Friends', 'Company', 'Service']),
    state : faker.location.state(),
    city: faker.location.city(),
    textarea: faker.lorem.sentences({ min: 1, max: 3 }),
    url: faker.internet.url({ protocol: 'http'}),
    company: faker.company.name(),
    year : faker.number.bigInt({ min: 2000, max: 2024 }),
    postCode: faker.number.zipcode,
}

module.exports = randomValues