import { buildSchema } from 'graphql';

export const schema = buildSchema(`
	type Query {
		hello: String
		message: String
		books: [String]
		employees: [Employee]
		slowEmployees: [Employee]
	}

	type Employee {
		firstName: String
		lastName: String
	}
`);
