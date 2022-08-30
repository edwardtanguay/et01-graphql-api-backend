import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import cors from 'cors';

const app = express();
const PORT = 5547;

const schema = buildSchema(`
	type Query {
		hello: String,
		message: String,
		books: [String]
	}
`);

const root = {
	hello: () => {
		return 'hello world';
	},
	message: () => {
		return 'the message';
	},
	books: () => {
		return ['More About Linux', 'Bash Shell Scripting']
	}
};
app.use(cors());

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
})

app.listen(PORT, () => {
    console.log(`API running at: http://localhost:${PORT}`);
    console.log(`GraphQL running at: http://localhost:${PORT}/graphql`);
});
