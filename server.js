import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import cors from 'cors';
import axios from 'axios';
import { schema } from './schema.js';

const app = express();
const PORT = 5547;

app.use(cors());

// const schema = buildSchema(mainSchema);

const root = {
    hello: () => {
        return 'hello world';
    },
    message: () => {
        return 'the message';
    },
    books: () => {
        return ['More About Linux', 'Bash Shell Scripting'];
    },
    employees: async () => {
        const rawEmployees = (
            await axios.get(
                'https://edwardtanguay.netlify.app/share/employees.json'
            )
        ).data;
        const employees = [];
        rawEmployees.forEach((rawEmployee) => {
            const employee = {
                firstName: rawEmployee.firstName,
                lastName: rawEmployee.lastName
            };
			employees.push(employee);
        });
        return employees;
    }
};

// app.all('/', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });
app.use(express.json());
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    })
);

app.get('/', (req, res) => {
    res.send('graphql api');
});

app.listen(PORT, () => {
    console.log(`API running at: http://localhost:${PORT}`);
    console.log(`GraphQL running at: http://localhost:${PORT}/graphql`);
});
