import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import cors from 'cors';

const app = express();
const PORT = 5547;


const schema = buildSchema(`
	type Query {
		hello: String
	}
`);

const root = {
	hello: () => {
		return 'hello world';
	}
};

app.use(
    '/graphql',
	graphqlHTTP({
		schema, 
		rootValue: root,
        graphiql: true
    })
);
app.use(cors({
	origin: "*",
}));

app.get('/', (req, res) => {
	res.send('graphql api');
})

app.listen(PORT, () => {
    console.log(`API running at: http://localhost:${PORT}`);
    console.log(`GraphQL running at: http://localhost:${PORT}/graphql`);
});
