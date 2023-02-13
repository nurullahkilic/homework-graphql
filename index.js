import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import data from "./src/assets/data.json" assert { type: "json" };

const typeDefs = `#graphql
  type User {
    id: ID!
    username: String
    email: String
    event: [Event]
  }

  type Event {
    id: ID!
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: ID
    user_id: ID
    location: Location
    user: User
    participants: [Participant]
  }

  type Location {
    id: ID!
    name: String
    desc: String
    lat: Float
    lng: Float
    event: Event
  }

  type Participant {
    id: ID!
    user_id: ID
    event_id: ID
    user: User
    event: Event
  }

  type Query {

    events: [Event]
    event(id:ID!): Event
    
    locations: [Location]
    location(id:ID!): Location

    users: [User]
    user(id:ID!): User

    participants: [Participant]
    participant(id:ID!): Participant

  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    events: () => data?.events,
    event: (_, args) => data?.events.find((event) => event.id == args.id),

    locations: () => data?.locations,
    location: (_, args) =>
      data?.locations.find((location) => location.id == args.id),

    users: () => data?.users,
    user: (_, args) => data?.users.find((user) => user.id == args.id),

    participants: () => data?.participants,
    participant: (_, args) =>
      data?.participants.find((participant) => participant.id == args.id),
  },
  Event: {
    user: (parent) => data?.users.find((user) => user.id == parent.user_id),
    location: (parent) =>
      data?.locations.find((location) => location.id == parent.location_id),
    participants: (parent) => data?.participants.filter(
        (participant) => participant.event_id === parent.id
      ),
  },
  Location: {
    event: (parent) => data?.events.find((event) => event.location_id == parent.id),
  },
  User: {
    event: (parent) => data?.events.filter((event) => event.user_id == parent.id),
  },
  Participant: {
    user: (parent) => data?.users.find((user) => user.id == parent.user_id),
    event: (parent) => data?.events.find((event) => event.id == parent.event_id),
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
