import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLEnumType,
    GraphQLList
} from "graphql";

import User from "../models/UserModel";
import Appartment from "../models/AppartementModel";
// Define GraphQL types

const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        full_name: { type: GraphQLString },
        phone_number: { type: GraphQLString }
    })
});

const RoleEnumType = new GraphQLEnumType({
    name: "Role",
    values: {
        SUPERADMIN: { value: "superadmin" },
        SYNDIC: { value: "syndic" }
    }
});

const AppartmentType = new GraphQLObjectType({
    name: "Appartment",
    fields: () => ({
        id: { type: GraphQLID },
        number: {
            type: GraphQLInt
        },
        client: { type: ClientType },
        syndic: {
            type: UserType,
            resolve(parent, _args) {
                return User.findById(parent.syndic_id);
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        fullName: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: RoleEnumType }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: () => ({
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(_parent, args) {
                return User.findById(args.id);
            }
        },
        Appartments: {
            type: new GraphQLList(AppartmentType),
            resolve(_parent, _args) {
                return Appartment.find();
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQuery
});

export default schema;
