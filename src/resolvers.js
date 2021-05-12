import { AuthenticationError } from "apollo-server-errors";
import { GraphQLScalarType, Kind } from "graphql";
import { CPU } from "./models/PCParts/CPU";
import { User } from "./models/Users/User";

export const resolvers = {
    Date: new GraphQLScalarType({
        name: "Date",
        description: "Date custom scalar type",
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.getTime();
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return new Date(ast.value);
            }
            return null;
        }
    }),
    Query: {
        cpu: (_, cpu, context) => {
            return CPU.searchCPU(cpu.CPU)
        }
    },
    Mutation: {
        addCPU: async (_, cpu, context) => {
            if (!await context.user || !(await context.user).roles.includes("verified")) throw new AuthenticationError('you must be logged in / or you don\'t the right privileges');
            return CPU.addCPU(cpu.CPU)
        },
        register: async (_, { user }, context) => {
            return await User.register(user);
        },
        login: async (_, { user }, context) => {
            return await User.login(user, context.ip)
        }
    }
}